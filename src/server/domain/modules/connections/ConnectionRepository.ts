import { IntEntityFactory } from "@server/infrastructure/persistence/entities/factories/IntEntityFactory.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";
import { Connection } from "./Connection.ts";
import { ConnectionEntity } from "./ConnectionEntity.ts";

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
