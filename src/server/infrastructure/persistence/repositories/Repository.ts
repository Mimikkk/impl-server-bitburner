import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";

export interface Repository<E extends Entity> {
  find(id: E["id"]): E | undefined;

  has(id: E["id"]): boolean;

  keys(): IterableIterator<E["id"]>;

  values(): IterableIterator<E>;

  persist(value: E["value"]): E;

  delete(id: E["id"]): boolean;
}
