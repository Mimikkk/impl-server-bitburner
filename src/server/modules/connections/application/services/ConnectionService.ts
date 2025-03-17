import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";
import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { Log } from "@shared/logging/log.ts";
import { ConnectionModel } from "../../domain/models/ConnectionModel.ts";

export class ConnectionService {
  static create(connections: ConnectionRepository) {
    return new ConnectionService(connections);
  }

  private constructor(
    private readonly connections: ConnectionRepository,
  ) {}

  list(): IterableIterator<ConnectionModel> {
    return this.connections.list();
  }

  find(id: number): ConnectionModel | undefined {
    return this.connections.find(id);
  }

  attach(socket: WebSocket): void {
    const connection = this.connections.persistSocket(socket);

    this.attachListeners(socket, connection);
  }

  private attachListeners(socket: WebSocket, { value: connection, id }: ConnectionModel): void {
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
