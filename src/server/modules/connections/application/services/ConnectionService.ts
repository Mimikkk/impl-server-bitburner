import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { Log } from "@shared/logging/log.ts";
import { ConnectionEntity } from "../../domain/entities/ConnectionEntity.ts";
import { RpcJsonResponse } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";

export class ConnectionService {
  static create(connections: ConnectionRepository) {
    return new ConnectionService(connections);
  }

  private constructor(
    private readonly connections: ConnectionRepository,
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

  private attachListeners(socket: WebSocket, { value: connection, id }: ConnectionEntity): void {
    socket.addEventListener("open", () => {
      Log.info("socket opened for connection", id);
    });

    socket.addEventListener("message", (event) => {
      const response = RpcJsonResponse.tryFrom(event.data);

      if (response === undefined) {
        Log.error("failed to parse message data from connection", id, event);
        return;
      }

      const request = connection.receive(response);

      if (request === undefined) {
        Log.error("failed to resolve message data from connection", id, event);
        return;
      }

      request.listeners.notify(response);
    });

    socket.addEventListener("error", (event) => {
      Log.error("socket provided an error from connection", id, event);
    });

    socket.addEventListener("close", () => {
      Log.info("socket closed for connection", id);
      this.connections.delete(id);
    });
  }
}
