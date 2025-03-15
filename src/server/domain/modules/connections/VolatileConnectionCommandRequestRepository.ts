import { ConnectionCommandRequestEntityFactory } from "@server/domain/modules/connections/ConnectionCommandRequestEntityFactory.ts";
import { ConnectionCommandRequestRepository } from "@server/domain/modules/connections/ConnectionCommandRequestRepository.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";
import { ConnectionCommandRequest } from "./ConnectionCommandRequest.ts";
import { ConnectionCommandRequestEntity } from "./ConnectionCommandRequestEntity.ts";
import { ConnectionCommandResponse } from "./ConnectionCommandResponse.ts";

export class VolatileConnectionCommandRequestRepository implements ConnectionCommandRequestRepository {
  static create(
    repository = VolatileRepository.create(ConnectionCommandRequestEntityFactory.create(IntGenerator.create())),
  ): VolatileConnectionCommandRequestRepository {
    return new VolatileConnectionCommandRequestRepository(repository);
  }

  private constructor(
    public readonly entities: Repository<ConnectionCommandRequestEntity>,
  ) {}

  resolve(response: ConnectionCommandResponse): ConnectionCommandRequestEntity | undefined {
    const entity = this.entities.find(response.id);

    if (entity === undefined) return;

    entity.listeners.notify(response);
    this.delete(entity.id);

    return entity;
  }

  persist(value: ConnectionCommandRequest): ConnectionCommandRequestEntity {
    return this.entities.persist(value);
  }

  delete(id: number): boolean {
    return this.entities.delete(id);
  }

  find(id: number): ConnectionCommandRequestEntity | undefined {
    return this.entities.find(id);
  }

  list(): IterableIterator<ConnectionCommandRequestEntity> {
    return this.entities.list();
  }

  has(id: number): boolean {
    return this.entities.has(id);
  }

  keys(): IterableIterator<number> {
    return this.entities.keys();
  }
}
