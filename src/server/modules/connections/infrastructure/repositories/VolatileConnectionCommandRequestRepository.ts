import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";
import { ConnectionCommandRequestEntity } from "@server/modules/connections/domain/entities/ConnectionCommandRequestEntity.ts";
import { ConnectionCommandRequest } from "@server/modules/connections/infrastructure/messaging/requests/ConnectionCommandRequest.ts";
import { ConnectionCommandResponse } from "@server/modules/connections/infrastructure/messaging/responses/ConnectionCommandResponse.ts";
import { ConnectionCommandRequestEntityFactory } from "../factories/ConnectionCommandRequestEntityFactory.ts";
import { ConnectionCommandRequestRepository } from "./ConnectionCommandRequestRepository.ts";

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
