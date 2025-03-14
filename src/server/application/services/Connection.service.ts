import { ConnectionEntity, ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";
import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";
import { Log } from "@shared/logging/log.ts";

export class ConnectionService {
  public static create() {
    return new ConnectionService(ConnectionRepository.instance);
  }

  private constructor(
    private readonly connections: ConnectionRepository,
  ) {}

  list(): IterableIterator<ConnectionEntity> {
    return this.connections.list();
  }

  attach(socket: WebSocket): void {
    const connection = this.connections.persistSocket(socket);

    this.attachListeners(socket, connection);
  }

  private attachListeners(socket: WebSocket, connection: ConnectionEntity): void {
    socket.addEventListener("open", () => {
      Log.info("socket opened for connection");
    });

    socket.addEventListener("message", (event) => {
      const response = RpcJsonResponse.tryFrom(event.data);

      if (response === undefined) {
        Log.error("failed to parse message data", event);
        return;
      }

      connection.value.resolve(response);
    });

    socket.addEventListener("error", (event) => {
      Log.error("socket provided an error", event);
    });

    socket.addEventListener("close", () => {
      Log.info("socket closed for connection");
      this.connections.delete(connection.id);
    });
  }
}
