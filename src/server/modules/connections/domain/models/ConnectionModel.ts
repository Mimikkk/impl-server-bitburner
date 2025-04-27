import { CommandRequestEntity } from "@server/modules/commands/domain/entities/CommandRequestEntity.ts";
import { CommandRequestRepository } from "@server/modules/commands/infrastructure/repositories/CommandRequestRepository.ts";
import { VolatileCommandRequestRepository } from "@server/modules/commands/infrastructure/repositories/VolatileCommandRequestRepository.ts";
import { CommandRequest } from "@server/modules/commands/presentation/messaging/rpc/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";

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

    this.socket.send(JSON.stringify(request));

    return entity;
  }

  promise(request: CommandRequest): Promise<CommandResponse | undefined> {
    const entity = this.requests.persist(request);

    return new Promise((resolve) => {
      const remove = entity.listeners.add((response) => {
        const request = this.requests.find(response.id);

        if (request) {
          remove();
          resolve(response);
        } else {
          resolve(undefined);
        }
      });

      this.socket.send(JSON.stringify(request));
    });
  }

  resolve(response: CommandResponse): CommandRequestEntity | undefined {
    return this.requests.resolve(response);
  }

  close(): void {
    this.socket.close();
  }
}
