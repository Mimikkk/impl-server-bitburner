import { CommandRequestEntity } from "@server/modules/commands/entities/CommandRequestEntity.ts";
import { CommandRequest } from "@server/modules/commands/infrastructure/messaging/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/infrastructure/messaging/responses/CommandResponse.ts";
import { CommandRequestRepository } from "@server/modules/commands/reposiories/CommandRequestRepository.ts";
import { VolatileCommandRequestRepository } from "@server/modules/commands/reposiories/VolatileCommandRequestRepository.ts";

export class ConnectionModel {
  static create(socket: WebSocket) {
    return new ConnectionModel(socket, VolatileCommandRequestRepository.create());
  }

  private constructor(
    private readonly socket: WebSocket,
    private readonly entities: CommandRequestRepository,
  ) {}

  send(request: CommandRequest): CommandRequestEntity {
    const entity = this.entities.persist(request);

    this.socket.send(JSON.stringify(request));

    return entity;
  }

  promise(request: CommandRequest): Promise<CommandRequestEntity | undefined> {
    const entity = this.entities.persist(request);

    return new Promise((resolve, reject) => {
      entity.listeners.add((response) => {
        const result = this.entities.resolve(response);
        console.log({
          request,
          response,
          entity,
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

  receive(response: CommandResponse): CommandRequestEntity | undefined {
    return this.entities.resolve(response);
  }

  close(): void {
    this.socket.close();
  }
}
