import { ConnectionCommandRequestEntity } from "@server/modules/connections/domain/entities/ConnectionCommandRequestEntity.ts";
import { ConnectionCommandRequest } from "@server/modules/connections/infrastructure/messaging/requests/ConnectionCommandRequest.ts";
import { ConnectionCommandResponse } from "@server/modules/connections/infrastructure/messaging/responses/ConnectionCommandResponse.ts";
import { ConnectionCommandRequestRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionCommandRequestRepository.ts";
import { VolatileConnectionCommandRequestRepository } from "@server/modules/connections/infrastructure/repositories/VolatileConnectionCommandRequestRepository.ts";

export class Connection {
  static create(socket: WebSocket) {
    return new Connection(socket, VolatileConnectionCommandRequestRepository.create());
  }

  private constructor(
    private readonly socket: WebSocket,
    private readonly requests: ConnectionCommandRequestRepository,
  ) {}

  request(request: ConnectionCommandRequest): ConnectionCommandRequestEntity {
    const entity = this.requests.persist(request);

    this.socket.send(JSON.stringify(request));

    return entity;
  }

  resolve(response: ConnectionCommandResponse): ConnectionCommandRequest | undefined {
    const request = this.requests.find(response.id);

    if (request === undefined) return;

    this.requests.resolve(response);

    return request.value;
  }

  close(): void {
    this.socket.close();
  }
}
