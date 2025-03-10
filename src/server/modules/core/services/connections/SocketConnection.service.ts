import { ConnectionManager } from "@server/modules/core/services/connections/SocketConnection.manager.ts";
import { RpcJsonResponse } from "@server/messages/responses/RpcJsonResponse.ts";
import { Log } from "@shared/logging/log.ts";

export class ConnectionService {
  public static create() {
    return new ConnectionService(new Map(), 0);
  }

  private constructor(
    public readonly managers: Map<WebSocket, ConnectionManager>,
    private id: number,
  ) {}

  public manage(socket: WebSocket) {
    const manager = ConnectionManager.create(this.id++, socket);

    this.managers.set(socket, manager);

    socket.addEventListener("open", () => {
      Log.info("socket opened for connection", manager.id);
    });

    socket.addEventListener("message", (event) => {
      const response = RpcJsonResponse.tryFrom(event.data);

      if (response === undefined) {
        Log.error("failed to parse message data", manager.id, event.data);
        return;
      }

      manager.resolve(response);
    });

    socket.addEventListener("error", (event) => {
      Log.error("socket provided an error", manager.id, event);
    });

    socket.addEventListener("close", () => {
      Log.info("socket closed for connection", manager.id);
      this.remove(socket);
    });

    return manager;
  }

  public close(socket: WebSocket) {
    socket.close();
  }

  private remove(socket: WebSocket) {
    this.managers.delete(socket);
  }
}
