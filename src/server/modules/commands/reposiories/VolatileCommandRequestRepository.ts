import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileRepository } from "@server/infrastructure/persistence/repositories/VolatileRepository.ts";
import { CommandRequestModelFactory } from "@server/modules/commands/infrastructure/factories/CommandRequestModelFactory.ts";
import { CommandRequest } from "@server/modules/commands/infrastructure/messaging/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/infrastructure/messaging/responses/CommandResponse.ts";
import { CommandRequestModel } from "../models/CommandRequestModel.ts";
import { CommandRequestRepository } from "./CommandRequestRepository.ts";

export class VolatileCommandRequestRepository implements CommandRequestRepository {
  static create(
    repository = VolatileRepository.create(CommandRequestModelFactory.create(IntGenerator.create())),
  ): VolatileCommandRequestRepository {
    return new VolatileCommandRequestRepository(repository);
  }

  private constructor(
    public readonly models: Repository<CommandRequestModel>,
  ) {}

  resolve(response: CommandResponse): CommandRequestModel | undefined {
    const model = this.models.find(response.id);

    if (model === undefined) return;

    model.listeners.notify(response);
    this.delete(model.id);

    return model;
  }

  persist(value: CommandRequest): CommandRequestModel {
    return this.models.persist(value);
  }

  delete(id: number): boolean {
    return this.models.delete(id);
  }

  find(id: number): CommandRequestModel | undefined {
    return this.models.find(id);
  }

  list(): IterableIterator<CommandRequestModel> {
    return this.models.list();
  }

  has(id: number): boolean {
    return this.models.has(id);
  }

  keys(): IterableIterator<number> {
    return this.models.keys();
  }
}
