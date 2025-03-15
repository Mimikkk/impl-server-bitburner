import { ConnectionEntity, ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";
import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";
import { Log } from "@shared/logging/log.ts";

export class ConnectionService {
  static create() {
    return new ConnectionService(ConnectionRepository.instance);
  }

  private constructor(
    private readonly connections: ConnectionRepository,
  ) {}

  list(): IterableIterator<ConnectionEntity> {
    return this.connections.list();
  }

  find(id: number): ConnectionEntity | undefined {
    return this.connections.find(id);
  }

  attach(socket: WebSocket): void {
    const connection = this.connections.persistSocket(socket);

    this.attachListeners(socket, connection);
  }

  private attachListeners(socket: WebSocket, connection: ConnectionEntity): void {
    socket.addEventListener("open", () => {
      Log.info("socket opened for connection", connection.id);
    });

    socket.addEventListener("message", (event) => {
      const response = RpcJsonResponse.tryFrom(event.data);

      if (response === undefined) {
        Log.error("failed to parse message data from connection", connection.id, event);
        return;
      }

      connection.value.resolve(response);
    });

    socket.addEventListener("error", (event) => {
      Log.error("socket provided an error from connection", connection.id, event);
    });

    socket.addEventListener("close", () => {
      Log.info("socket closed for connection", connection.id);
      this.connections.delete(connection.id);
    });
  }
}
