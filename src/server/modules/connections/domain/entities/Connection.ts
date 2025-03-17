import { CommandRequest } from "@server/modules/commands/infrastructure/messaging/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/infrastructure/messaging/responses/CommandResponse.ts";
import { CommandRequestModel } from "@server/modules/commands/models/CommandRequestModel.ts";
import { CommandRequestRepository } from "@server/modules/commands/reposiories/CommandRequestRepository.ts";
import { VolatileCommandRequestRepository } from "@server/modules/commands/reposiories/VolatileCommandRequestRepository.ts";

export class Connection {
  static create(socket: WebSocket) {
    return new Connection(socket, VolatileCommandRequestRepository.create());
  }

  private constructor(
    private readonly socket: WebSocket,
    private readonly models: CommandRequestRepository,
  ) {}

  send(request: CommandRequest): CommandRequestModel {
    const model = this.models.persist(request);

    this.socket.send(JSON.stringify(request));

    return model;
  }

  promise(request: CommandRequest): Promise<CommandRequestModel | undefined> {
    const model = this.models.persist(request);

    return new Promise((resolve, reject) => {
      model.listeners.add((response) => {
        const result = this.models.resolve(response);
        console.log({
          request,
          response,
          model,
          result,
        });

        if (result) {
          resolve(result);
        } else {
          reject(undefined);
        }
      });

      this.socket.send(JSON.stringify(request));
    });
  }

  receive(response: CommandResponse): CommandRequestModel | undefined {
    return this.models.resolve(response);
  }

  close(): void {
    this.socket.close();
  }
}
