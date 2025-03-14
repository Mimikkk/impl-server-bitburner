import { ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";
import { Connection } from "@server/domain/modules/connections/models/Connection.ts";
import { RpcJsonRequest } from "@server/infrastructure/messaging/requests/RpcJsonRequest.ts";
import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";
import { Log } from "@shared/logging/log.ts";

export class ConnectionService {
  public static create() {
    return new ConnectionService(ConnectionRepository.instance);
  }

  private constructor(
    private readonly repository: ConnectionRepository,
  ) {}

  manage(socket: WebSocket): Connection {
    const connection = this.repository.create(socket);
    this.setupListeners(socket, connection);
    return connection;
  }

  read(id: number): Connection | undefined {
    return this.repository.read(id);
  }

  list(): Connection[] {
    return this.repository.list();
  }

  sendRequest(connectionId: number, request: RpcJsonRequest): boolean {
    const connection = this.repository.read(connectionId);
    if (!connection) return false;

    connection.request(request);
    return true;
  }

  closeConnection(id: number): boolean {
    const connection = this.repository.read(id);
    if (!connection) return false;

    connection.close();
    this.repository.delete(id);
    return true;
  }

  closeAll(): void {
    for (const connection of this.repository.list()) {
      connection.resource.close();
      this.repository.delete(connection.id);
    }
  }

  private setupListeners(socket: WebSocket, connection: Connection): void {
    socket.addEventListener("open", () => {
      Log.info("socket opened for connection", connection.id);
    });

    socket.addEventListener("message", (event) => {
      const response = RpcJsonResponse.tryFrom(event.data);

      if (response === undefined) {
        Log.error("failed to parse message data", connection.id, event.data);
        return;
      }

      connection.resolve(response);
    });

    socket.addEventListener("error", (event) => {
      Log.error("socket provided an error", connection.id, event);
    });

    socket.addEventListener("close", () => {
      Log.info("socket closed for connection", connection.id);
      this.repository.remove(connection.id);
    });
  }
}
