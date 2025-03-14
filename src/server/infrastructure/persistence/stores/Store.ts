export interface Store<K, V> {
  find(id: K): V | undefined;

  keys(): IterableIterator<K>;

  list(): IterableIterator<V>;

  has(id: K): boolean;

  set(id: K, value: V): void;

  delete(id: K): boolean;
}
