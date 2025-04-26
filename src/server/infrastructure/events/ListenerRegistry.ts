export class ListenerRegistry<V> {
  static create<V>(): ListenerRegistry<V> {
    return new ListenerRegistry<V>([]);
  }

  private constructor(
    public readonly listeners: ListenerRegistry.Listener<V>[],
  ) {}

  add(listener: ListenerRegistry.Listener<V>): ListenerRegistry.Unsubscribe {
    this.listeners.push(listener);

    return () => this.remove(listener);
  }

  remove(listener: ListenerRegistry.Listener<V>): boolean {
    const index = this.listeners.indexOf(listener);

    if (index === -1) return false;
    this.listeners.splice(index, 1);
    return true;
  }

  notify(value: V): void {
    for (let i = 0; i < this.listeners.length; ++i) {
      this.listeners[i](value);
    }
  }
}

export namespace ListenerRegistry {
  export type Listener<V> = (value: V) => void;
  export type Unsubscribe = () => void;
}
