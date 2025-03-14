import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { EntityFactory } from "@server/infrastructure/persistence/entities/EntityFactory.ts";
import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { VolatileStore } from "@server/infrastructure/persistence/stores/VolatileStore.ts";

export class VolatileRepository<E extends Entity> implements Repository<E> {
  static create<E extends Entity>(entities: EntityFactory<E>): VolatileRepository<E> {
    return new VolatileRepository<E>(VolatileStore.create(), entities);
  }

  private constructor(
    private readonly store: VolatileStore<E["id"], E>,
    private readonly entities: EntityFactory<E>,
  ) {}

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

  persist(value: E["resource"]): E {
    const entity = this.entities.create(value);

    this.store.set(entity.id, entity);

    return entity;
  }

  createMany(values: E["resource"][]): E[] {
    return values.map((value) => this.persist(value));
  }

  delete(id: E["id"]): boolean {
    return this.store.delete(id);
  }
}
