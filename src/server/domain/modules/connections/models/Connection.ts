import { RpcJsonRequest } from "@server/infrastructure/messaging/requests/RpcJsonRequest.ts";
import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";

export class Connection {
  public static create(socket: WebSocket) {
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

  resolve(response: RpcJsonResponse): void {
    const request = this.requests.get(response.id);

    if (request) this.requests.delete(response.id);
  }

  close(): void {
    this.socket.close();
  }
}
