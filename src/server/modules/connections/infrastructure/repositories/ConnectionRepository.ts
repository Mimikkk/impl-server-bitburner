import { IntEntityFactory } from "@server/infrastructure/persistence/entities/factories/IntEntityFactory.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";
import { ConnectionModel } from "@server/modules/connections/domain/models/ConnectionModel.ts";
import { ConnectionEntity } from "../../domain/entities/ConnectionEntity.ts";

export class ConnectionRepository implements Repository<ConnectionEntity> {
  static instance = ConnectionRepository.create();

  static create(
    repository = VolatileRepository.create(IntEntityFactory.create(IntGenerator.create())),
  ): ConnectionRepository {
    return new ConnectionRepository(repository);
  }

  private constructor(
    public readonly entities: Repository<ConnectionEntity>,
  ) {}

  has(id: number): boolean {
    return this.entities.has(id);
  }

  persist(value: ConnectionModel): ConnectionEntity {
    return this.entities.persist(value);
  }

  delete(id: number): boolean {
    return this.entities.delete(id);
  }

  keys(): IterableIterator<number> {
    return this.entities.keys();
  }

  find(id: number): ConnectionEntity | undefined {
    return this.entities.find(id);
  }

  values(): IterableIterator<ConnectionEntity> {
    return this.entities.values();
  }

  persistSocket(socket: WebSocket): ConnectionEntity {
    return this.entities.persist(ConnectionModel.create(socket));
  }
}
