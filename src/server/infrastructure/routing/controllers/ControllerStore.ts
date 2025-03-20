import { Store } from "@server/infrastructure/persistence/stores/Store.ts";
import { VolatileStore } from "@server/infrastructure/persistence/stores/VolatileStore.ts";
import { Controller, ControllerClass } from "@server/infrastructure/routing/controllers/ControllerTypes.ts";

export class ControllerStore {
  static instance = ControllerStore.create();

  static create() {
    return new ControllerStore(VolatileStore.create());
  }

  private constructor(
    private readonly controllers: Store<ControllerClass, Controller>,
  ) {}

  get<C extends ControllerClass>(key: C): Controller<C> {
    let instance = this.controllers.find(key);

    if (instance === undefined) {
      instance = key.create() as Controller<C>;
      this.controllers.set(key, instance);
    }

    return instance;
  }

  keys(): IterableIterator<ControllerClass> {
    return this.controllers.keys();
  }

  values(): IterableIterator<Controller> {
    return this.controllers.values();
  }
}
