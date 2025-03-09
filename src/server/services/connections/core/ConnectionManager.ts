import { RpcJsonResponse } from "@server/messages/responses/RpcJsonResponse.ts";
import { RpcJsonRequest } from "@server/messages/requests/RpcJsonRequest.ts";

export class ConnectionManager {
  public static create = (socket: WebSocket, id: number) => new ConnectionManager(socket, new Map(), id);

  private constructor(
    public readonly socket: WebSocket,
    public readonly map: Map<number, RpcJsonRequest>,
    public readonly id: number,
  ) {}

  wait(request: RpcJsonRequest) {
    this.map.set(request.id, request);
  }

  resolve({ id }: RpcJsonResponse): RpcJsonRequest | undefined {
    const request = this.map.get(id);
    if (request) this.map.delete(id);

    return request;
  }
}
