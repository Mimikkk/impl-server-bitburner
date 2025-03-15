import { ConnectionService } from "@server/application/services/Connection.service.ts";
import { BitburnerCommands } from "@server/domain/modules/bitburner/commands/BitburnerCommand.enum.ts";
import { Command } from "@server/domain/modules/commands/Command.ts";
import { ConnectionEntity, ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";

export class BitburnerConnectionService {
  static create(connections: ConnectionRepository) {
    return new BitburnerConnectionService(ConnectionService.create(connections, BitburnerCommands.registry));
  }

  private constructor(
    private readonly connections: ConnectionService,
  ) {}

  list(): IterableIterator<ConnectionEntity> {
    return this.connections.list();
  }

  find(id: number): ConnectionEntity | undefined {
    return this.connections.find(id);
  }

  attach(socket: WebSocket): void {
    this.connections.attach(socket);
  }

  listCommands(): IterableIterator<Command> {
    return this.connections.listCommands();
  }
}
