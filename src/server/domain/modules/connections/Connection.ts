import { ConnectionCommandRequestRepository } from "@server/domain/modules/connections/ConnectionCommandRequestRepository.ts";
import { VolatileConnectionCommandRequestRepository } from "@server/domain/modules/connections/VolatileConnectionCommandRequestRepository.ts";
import { ConnectionCommandRequest } from "./ConnectionCommandRequest.ts";
import { ConnectionCommandRequestEntity } from "./ConnectionCommandRequestEntity.ts";
import { ConnectionCommandResponse } from "./ConnectionCommandResponse.ts";

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
