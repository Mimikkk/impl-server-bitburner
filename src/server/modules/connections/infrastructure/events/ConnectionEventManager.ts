import { EventManager } from "@server/infrastructure/events/EventManager.ts";
import { ListenerRegistry } from "@server/infrastructure/events/ListenerRegistry.ts";
import { VolatileEventManager } from "@server/infrastructure/events/VolatileEventManager.ts";
import { ConnectionEntity } from "@server/modules/connections/domain/entities/ConnectionEntity.ts";
import { ConnectionEvent } from "../../domain/events/ConnectionEvent.ts";

type EventMap = {
  [ConnectionEvent.Connected]: { connection: ConnectionEntity; event: Event };
  [ConnectionEvent.Disconnected]: { connection: ConnectionEntity; event: Event };
  [ConnectionEvent.Failed]: { connection: ConnectionEntity; event: Event };
};
type EventKey = keyof EventMap;

export class ConnectionEventManager implements EventManager<EventMap> {
  static instance = ConnectionEventManager.create();

  static create() {
    return new ConnectionEventManager();
  }

  private constructor(
    private readonly manager = VolatileEventManager.create<EventMap>(Object.values(ConnectionEvent)),
  ) {}

  notify(event: EventKey, connection: EventMap[EventKey]) {
    return this.manager.notify(event, connection);
  }

  subscribe(event: EventKey, listener: ListenerRegistry.Listener<EventMap[EventKey]>) {
    this.manager.subscribe(event, listener);
    return this;
  }

  unsubscribe(event: EventKey, listener: ListenerRegistry.Listener<EventMap[EventKey]>): boolean {
    return this.manager.unsubscribe(event, listener);
  }
}
