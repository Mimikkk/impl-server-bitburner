import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";
import { IntModelFactory } from "../../../../infrastructure/persistence/models/factories/IntModelFactory.ts";
import { Connection } from "../../domain/entities/Connection.ts";
import { ConnectionModel } from "../../domain/models/ConnectionModel.ts";
export class ConnectionRepository implements Repository<ConnectionModel> {
  static instance = ConnectionRepository.create();

  static create(
    repository = VolatileRepository.create(IntModelFactory.create(IntGenerator.create())),
  ): ConnectionRepository {
    return new ConnectionRepository(repository);
  }

  private constructor(
    public readonly entities: Repository<ConnectionModel>,
  ) {}

  has(id: number): boolean {
    return this.entities.has(id);
  }

  persist(value: Connection): ConnectionModel {
    return this.entities.persist(value);
  }

  delete(id: number): boolean {
    return this.entities.delete(id);
  }

  keys(): IterableIterator<number> {
    return this.entities.keys();
  }

  find(id: number): ConnectionModel | undefined {
    return this.entities.find(id);
  }

  list(): IterableIterator<ConnectionModel> {
    return this.entities.list();
  }

  persistSocket(socket: WebSocket): ConnectionModel {
    return this.entities.persist(Connection.create(socket));
  }
}
