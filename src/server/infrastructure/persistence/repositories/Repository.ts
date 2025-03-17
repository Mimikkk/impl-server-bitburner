import { Model } from "../models/Model.ts";

export interface Repository<E extends Model> {
  find(id: E["id"]): E | undefined;

  has(id: E["id"]): boolean;

  keys(): IterableIterator<E["id"]>;

  list(): IterableIterator<E>;

  persist(value: E["value"]): E;

  delete(id: E["id"]): boolean;
}
