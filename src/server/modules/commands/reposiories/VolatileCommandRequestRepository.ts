import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";
import { CommandRequestEntity } from "@server/modules/commands/entities/CommandRequestEntity.ts";
import { CommandRequest } from "@server/modules/commands/infrastructure/messaging/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/infrastructure/messaging/responses/CommandResponse.ts";
import { CommandRequestEntityFactory } from "../infrastructure/factories/CommandRequestEntityFactory.ts";
import { CommandRequestRepository } from "./CommandRequestRepository.ts";

export class VolatileCommandRequestRepository implements CommandRequestRepository {
  static create(
    repository = VolatileRepository.create(CommandRequestEntityFactory.create(IntGenerator.create())),
  ): VolatileCommandRequestRepository {
    return new VolatileCommandRequestRepository(repository);
  }

  private constructor(
    public readonly entities: Repository<CommandRequestEntity>,
  ) {}

  resolve(response: CommandResponse): CommandRequestEntity | undefined {
    const entity = this.entities.find(response.id);

    if (entity === undefined) return;

    entity.listeners.notify(response);
    this.delete(entity.id);

    return entity;
  }

  persist(value: CommandRequest): CommandRequestEntity {
    return this.entities.persist(value);
  }

  delete(id: number): boolean {
    return this.entities.delete(id);
  }

  find(id: number): CommandRequestEntity | undefined {
    return this.entities.find(id);
  }

  values(): IterableIterator<CommandRequestEntity> {
    return this.entities.values();
  }

  has(id: number): boolean {
    return this.entities.has(id);
  }

  keys(): IterableIterator<number> {
    return this.entities.keys();
  }
}
