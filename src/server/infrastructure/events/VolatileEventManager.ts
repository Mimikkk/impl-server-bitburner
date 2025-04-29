import { EventManager } from "@server/infrastructure/events/EventManager.ts";
import { ListenerRegistry } from "@server/infrastructure/events/ListenerRegistry.ts";
import { Awaitable } from "@server/shared/types/common.ts";
import { VolatileListenerRegistry } from "./VolatileListenerRegistry.ts";

export class VolatileEventManager<EventMap extends Record<string, unknown>> implements EventManager<EventMap> {
  static create<EventMap extends Record<string, unknown>>(names?: (keyof EventMap)[]): VolatileEventManager<EventMap> {
    return new VolatileEventManager<EventMap>(
      names ? new Map(names.map((name) => [name, VolatileListenerRegistry.create()])) : new Map(),
    );
  }

  private constructor(
    private readonly listeners = new Map<keyof EventMap, VolatileListenerRegistry<EventMap[keyof EventMap]>>(),
  ) {}

  notify<const E extends keyof EventMap>(event: E, value: EventMap[E]): Awaitable<void> {
    const listener = this.listeners.get(event);

    if (listener === undefined) {
      return;
    }

    return listener.notify(value);
  }

  subscribe<const E extends keyof EventMap>(event: E, listener: ListenerRegistry.Listener<EventMap[E]>): void {
    const registry = this.listeners.get(event) as VolatileListenerRegistry<EventMap[E]> | undefined;

    if (registry === undefined) {
      return;
    }

    registry.subscribe(listener);
  }

  unsubscribe<const E extends keyof EventMap>(event: E, listener: ListenerRegistry.Listener<EventMap[E]>): boolean {
    const registry = this.listeners.get(event) as VolatileListenerRegistry<EventMap[E]> | undefined;

    if (registry === undefined) {
      return false;
    }

    return registry.unsubscribe(listener);
  }
}
