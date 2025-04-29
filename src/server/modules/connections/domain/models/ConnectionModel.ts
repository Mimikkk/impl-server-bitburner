import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { CommandRequestEntity } from "@server/modules/commands/domain/entities/CommandRequestEntity.ts";
import { CommandModel } from "@server/modules/commands/domain/models/CommandModel.ts";
import { CommandRequestRepository } from "@server/modules/commands/infrastructure/repositories/CommandRequestRepository.ts";
import { VolatileCommandRequestRepository } from "@server/modules/commands/infrastructure/repositories/VolatileCommandRequestRepository.ts";
import { CommandRequest } from "@server/modules/commands/presentation/messaging/rpc/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";
import { RpcJsonResponse } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";
import { ConnectionCommandError } from "../errors/ConnectionCommandError.ts";

export class ConnectionModel {
  static create(socket: WebSocket) {
    return new ConnectionModel(socket, VolatileCommandRequestRepository.create());
  }

  private constructor(
    private readonly socket: WebSocket,
    private readonly requests: CommandRequestRepository,
  ) {}

  send(request: CommandRequest): CommandRequestEntity {
    const entity = this.requests.persist(request);

    this.message(request);

    return entity;
  }

  promise(request: CommandRequest): Promise<CommandResponse | undefined> {
    const entity = this.requests.persist(request);

    return new Promise((resolve) => {
      const remove = entity.listeners.subscribe((response) => {
        const request = this.requests.find(response.id);

        if (request) {
          remove();
          resolve(response);
        }
      });

      this.message(request);
    });
  }

  async command<M extends CommandModel>(command: M, params: M["Request"]) {
    const request = command.request(params);
    if (ValidationError.is(request)) {
      return ConnectionCommandError.InvalidRequest;
    }

    const response = await this.promise(request.value);
    if (response === undefined) {
      return ConnectionCommandError.InvalidResponse;
    }

    if (RpcJsonResponse.isError(response)) {
      return ConnectionCommandError.Internal;
    }

    return response.result as M["Response"];
  }

  resolve(response: CommandResponse): CommandRequestEntity | undefined {
    return this.requests.resolve(response);
  }

  close(): void {
    this.socket.close();
  }

  private message(request: CommandRequest): void {
    this.socket.send(JSON.stringify(request));
  }
}
