import { ConnectionService } from "../../../connections/application/services/ConnectionService.ts";
import { ConnectionEntity } from "../../../connections/domain/entities/ConnectionEntity.ts";

export class BitburnerConnectionService {
  static create() {
    return new BitburnerConnectionService();
  }

  private constructor(
    private readonly connections: ConnectionService = ConnectionService.create(),
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
