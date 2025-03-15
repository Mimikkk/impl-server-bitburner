import { ConnectionEntity } from "@server/modules/connections/domain/entities/ConnectionEntity.ts";
import { ConnectionCommand } from "@server/modules/connections/domain/models/ConnectionCommand.ts";
import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { ConnectionService } from "../../../connections/application/services/ConnectionService.ts";
import { BitburnerCommandRegistry } from "../../domain/commands/BitburnerCommandRegistry.ts";

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
