import { Store } from "@server/infrastructure/persistence/stores/Store.ts";
import { VolatileStore } from "@server/infrastructure/persistence/stores/VolatileStore.ts";
import { PathParameter } from "@server/presentation/messaging/http/parameters/PathParameter.ts";

export class PathParameterStore implements Store<string, PathParameter> {
  static instance = PathParameterStore.create();

  static create(): PathParameterStore {
    return new PathParameterStore(VolatileStore.create());
  }

  private constructor(
    private readonly store: VolatileStore<string, PathParameter>,
  ) {}

  keys(): IterableIterator<string> {
    return this.store.keys();
  }
  values(): IterableIterator<PathParameter> {
    return this.store.values();
  }

  has(id: string): boolean {
    return this.store.has(id);
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  find(key: string): PathParameter | undefined {
    return this.store.find(key);
  }

  set(key: string, value: PathParameter): void {
    this.store.set(key, value);
  }

  add(parameter: PathParameter): void {
    this.set(parameter.name, parameter);
  }
}
