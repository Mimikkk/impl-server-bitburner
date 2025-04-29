import { ConnectionEventManager } from "@server/modules/connections/infrastructure/events/ConnectionEventManager.ts";
import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { RpcJsonResponse } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";
import { Log } from "@shared/logging/log.ts";
import { ConnectionEntity } from "../../domain/entities/ConnectionEntity.ts";
import { ConnectionEvent } from "../../domain/events/ConnectionEvent.ts";

export class ConnectionService {
  static create() {
    return new ConnectionService();
  }

  private constructor(
    private readonly connections = ConnectionRepository.instance,
  ) {}

  list(): IterableIterator<ConnectionEntity> {
    return this.connections.values();
  }

  find(id: number): ConnectionEntity | undefined {
    return this.connections.find(id);
  }

  attach(socket: WebSocket): void {
    const connection = this.connections.persistSocket(socket);

    this.attachListeners(socket, connection);
  }

  private attachListeners(socket: WebSocket, connection: ConnectionEntity): void {
    socket.addEventListener("open", (event) => {
      ConnectionEventManager.instance.notify(ConnectionEvent.Connected, { connection, event });
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
      ConnectionEventManager.instance.notify(ConnectionEvent.Failed, { connection, event });
    });

    socket.addEventListener("close", (event) => {
      Log.info("socket closed for connection", connection.id);
      this.connections.delete(connection.id);
      ConnectionEventManager.instance.notify(ConnectionEvent.Disconnected, { connection, event });
    });
  }
}
