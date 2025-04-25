export interface Store<K, V> {
  find(key: K): V | undefined;

  keys(): IterableIterator<K>;

  values(): IterableIterator<V>;

  has(key: K): boolean;

  set(key: K, value: V): void;

  delete(key: K): boolean;
}
