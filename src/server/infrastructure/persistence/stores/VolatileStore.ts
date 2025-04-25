import { Store } from "@server/infrastructure/persistence/stores/Store.ts";

export class VolatileStore<K, V> implements Store<K, V> {
  static create<K, V>(): VolatileStore<K, V> {
    return new VolatileStore<K, V>(new Map());
  }

  private constructor(
    private readonly map: Map<K, V>,
  ) {}

  find(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }

  set(key: K, value: V): void {
    this.map.set(key, value);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }
}
