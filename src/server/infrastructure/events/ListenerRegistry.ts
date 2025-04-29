import { Awaitable } from "@server/shared/types/common.ts";

export interface ListenerRegistry<V> {
  subscribe(listener: ListenerRegistry.Listener<V>): ListenerRegistry.Unsubscribe;
  unsubscribe(listener: ListenerRegistry.Listener<V>): boolean;
  notify(value: V): Awaitable<void>;
}

export namespace ListenerRegistry {
  export type Listener<V> = (value: V) => Awaitable<void>;
  export type Unsubscribe = () => void;
}
