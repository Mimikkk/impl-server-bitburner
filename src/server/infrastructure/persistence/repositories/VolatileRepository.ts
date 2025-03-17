import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileStore } from "@server/infrastructure/persistence/stores/VolatileStore.ts";
import { ModelFactory } from "../models/factories/ModelFactory.ts";
import { Model } from "../models/Model.ts";

export class VolatileRepository<E extends Model> implements Repository<E> {
  static create<E extends Model>(entities: ModelFactory<E>): VolatileRepository<E> {
    return new VolatileRepository<E>(VolatileStore.create(), entities);
  }

  private constructor(
    private readonly store: VolatileStore<E["id"], E>,
    private readonly factory: ModelFactory<E>,
  ) {}

  delete(id: E["id"]): boolean {
    return this.store.delete(id);
  }

  has(id: E["id"]): boolean {
    return this.store.has(id);
  }

  find(id: E["id"]): E | undefined {
    return this.store.find(id);
  }

  keys(): IterableIterator<E["id"]> {
    return this.store.keys();
  }

  list(): IterableIterator<E> {
    return this.store.list();
  }

  persist(value: E["value"]): E {
    const model = this.factory.create(value);

    this.store.set(model.id, model);

    return model;
  }

  remove(id: E["id"]): boolean {
    return this.store.delete(id);
  }
}
