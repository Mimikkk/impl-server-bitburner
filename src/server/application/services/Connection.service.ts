import { CommandRegistry } from "@server/domain/modules/commands/Command.registry.ts";
import { Command } from "@server/domain/modules/commands/Command.ts";
import { ConnectionEntity, ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";
import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";
import { Log } from "@shared/logging/log.ts";

export class ConnectionService {
  static create(connections: ConnectionRepository, commands: CommandRegistry) {
    return new ConnectionService(connections, commands);
  }

  private constructor(
    private readonly connections: ConnectionRepository,
    private readonly commands: CommandRegistry,
  ) {}

  list(): IterableIterator<ConnectionEntity> {
    return this.connections.list();
  }

  listCommands(): IterableIterator<Command> {
    return this.commands.list();
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

      const request = connection.resolve(response);

      if (request === undefined) {
        Log.error("failed to resolve message data from connection", id, event);
        return;
      }

      const command = this.commands.get(request.method as keyof typeof this.commands.type) as Command;

      if (command === undefined) {
        Log.error("Command not found", request.method);
        return;
      }

      command.handle(response);
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
