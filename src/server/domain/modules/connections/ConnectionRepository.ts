import { Connection } from "@server/domain/modules/connections/models/Connection.ts";
import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { IntEntityFactory } from "@server/infrastructure/persistence/entities/IntEntityFactory.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";

export type ConnectionEntity = Entity<number, Connection>;

export class ConnectionRepository implements Repository<ConnectionEntity> {
  static instance = ConnectionRepository.create();

  static create(
    repository: Repository<ConnectionEntity> = VolatileRepository.create(
      IntEntityFactory.create(IntGenerator.create()),
    ),
  ) {
    return new ConnectionRepository(repository);
  }

  private constructor(
    private readonly entities: Repository<ConnectionEntity>,
  ) {}

  has(id: number): boolean {
    return this.entities.has(id);
  }

  persist(value: Connection): ConnectionEntity {
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

  list(): IterableIterator<ConnectionEntity> {
    return this.entities.list();
  }

  persistSocket(socket: WebSocket): ConnectionEntity {
    return this.entities.persist(Connection.create(socket));
  }
}
