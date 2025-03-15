import { RpcJsonRequest } from "@server/infrastructure/messaging/requests/RpcJsonRequest.ts";
import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";

export class Connection {
  static create(socket: WebSocket) {
    return new Connection(socket, new Map());
  }

  private constructor(
    private readonly socket: WebSocket,
    private readonly requests: Map<number, RpcJsonRequest>,
  ) {}

  request(request: RpcJsonRequest) {
    this.requests.set(request.id, request);

    this.socket.send(JSON.stringify(request));
  }

  resolve(response: RpcJsonResponse): RpcJsonRequest | undefined {
    const request = this.requests.get(response.id);

    if (request === undefined) return;

    this.requests.delete(response.id);

    return request;
  }

  close(): void {
    this.socket.close();
  }
}
