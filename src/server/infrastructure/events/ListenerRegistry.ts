export interface ListenerRegistry<V> {
  subscribe(listener: ListenerRegistry.Listener<V>): ListenerRegistry.Unsubscribe;
  unsubscribe(listener: ListenerRegistry.Listener<V>): boolean;
  notify(value: V): void;
}

export namespace ListenerRegistry {
  export type Listener<V> = (value: V) => void;
  export type Unsubscribe = () => void;
}
