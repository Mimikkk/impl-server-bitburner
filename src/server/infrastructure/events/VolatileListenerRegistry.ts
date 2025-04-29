import { ListenerRegistry } from "@server/infrastructure/events/ListenerRegistry.ts";

export class VolatileListenerRegistry<V> implements ListenerRegistry<V> {
  static create<V>(): VolatileListenerRegistry<V> {
    return new VolatileListenerRegistry<V>([]);
  }

  private constructor(
    public readonly listeners: ListenerRegistry.Listener<V>[],
  ) {}

  subscribe(listener: ListenerRegistry.Listener<V>): ListenerRegistry.Unsubscribe {
    this.listeners.push(listener);

    return () => this.unsubscribe(listener);
  }

  unsubscribe(listener: ListenerRegistry.Listener<V>): boolean {
    const index = this.listeners.indexOf(listener);

    if (index === -1) return false;
    this.listeners.splice(index, 1);
    return true;
  }

  async notify(value: V): Promise<void> {
    for (let i = 0; i < this.listeners.length; ++i) {
      await this.listeners[i](value);
    }
  }
}
