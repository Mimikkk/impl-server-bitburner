import { RpcJsonResponse } from "@server/messages/responses/RpcJsonResponse.ts";
import { RpcJsonRequest } from "@server/messages/requests/RpcJsonRequest.ts";

export class CommandQueue {
  public static create = (socket: WebSocket) => new CommandQueue(socket, new Map());

  private constructor(
    public readonly socket: WebSocket,
    public readonly map: Map<number, RpcJsonRequest>,
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
