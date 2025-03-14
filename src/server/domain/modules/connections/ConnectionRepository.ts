import { Connection } from "@server/domain/modules/connections/models/Connection.ts";
import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { IntEntityFactory } from "@server/infrastructure/persistence/entities/IntEntityFactory.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";

export class ConnectionRepository {
  static instance = ConnectionRepository.create();

  static create() {
    return new ConnectionRepository(
      VolatileRepository.create(IntEntityFactory.create(IntGenerator.create())),
    );
  }

  private constructor(
    private readonly repository: Repository<Entity<number, Connection>>,
  ) {}

  create(socket: WebSocket): Connection {
    const connection = Connection.create(socket);

    this.repository.persist(connection);

    return connection;
  }

  read(id: number): Connection | undefined {
    return this.repository.find(id)?.resource;
  }

  list(): Entity<number, Connection>[] {
    return Array.from(this.repository.list());
  }
}
