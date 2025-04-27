import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { ConnectionService } from "../../../connections/application/services/ConnectionService.ts";
import { ConnectionEntity } from "../../../connections/domain/entities/ConnectionEntity.ts";

export class BitburnerConnectionService {
  static create(connections: ConnectionRepository = ConnectionRepository.instance) {
    return new BitburnerConnectionService(ConnectionService.create(connections));
  }

  private constructor(
    private readonly connections: ConnectionService,
  ) {}

  attach(socket: WebSocket): void {
    this.connections.attach(socket);
  }

  all(): IterableIterator<ConnectionEntity> {
    return this.connections.list();
  }

  any(): ConnectionEntity | undefined {
    return this.connections.list().next().value;
  }

  find(id: number): ConnectionEntity | undefined {
    return this.connections.find(id);
  }
}
