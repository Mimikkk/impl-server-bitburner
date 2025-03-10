import { RpcJsonResponse } from "@server/messages/responses/RpcJsonResponse.ts";
import { RpcJsonRequest } from "@server/messages/requests/RpcJsonRequest.ts";

export class ConnectionManager {
  public static create(id: number, socket: WebSocket) {
    return new ConnectionManager(id, socket, new Map());
  }

  private constructor(
    public readonly id: number,
    public readonly socket: WebSocket,
    public readonly map: Map<number, RpcJsonRequest>,
  ) {}

  wait(request: RpcJsonRequest) {
    this.map.set(request.id, request);
  }

  resolve(response: RpcJsonResponse): void {
    const request = this.map.get(response.id);

    if (request) this.map.delete(response.id);
  }
}
