import { ConnectionService } from "@server/application/services/Connection.service.ts";
import { BitburnerCommandRegistry } from "@server/domain/modules/bitburner/commands/BitburnerCommandRegistry.ts";
import { ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";
import { ConnectionEntity } from "@server/domain/modules/connections/entities/ConnectionEntity.ts";
import { ConnectionCommand } from "@server/domain/modules/connections/models/ConnectionCommand.ts";

export class BitburnerConnectionService {
  static create(connections: ConnectionRepository) {
    return new BitburnerConnectionService(ConnectionService.create(connections, BitburnerCommandRegistry.all));
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

  listCommands(): IterableIterator<ConnectionCommand> {
    return this.connections.listCommands();
  }

  findCommand(method: string): ConnectionCommand | undefined {
    return this.connections.findCommand(method);
  }
}
