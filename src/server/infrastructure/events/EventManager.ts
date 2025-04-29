import { ListenerRegistry } from "@server/infrastructure/events/ListenerRegistry.ts";

export interface EventManager<EventMap extends Record<string, unknown>> {
  notify<const E extends keyof EventMap>(event: E, value: EventMap[E]): void;
  subscribe<const E extends keyof EventMap>(event: E, listener: ListenerRegistry.Listener<EventMap[E]>): void;
  unsubscribe<const E extends keyof EventMap>(event: E, listener: ListenerRegistry.Listener<EventMap[E]>): boolean;
}
