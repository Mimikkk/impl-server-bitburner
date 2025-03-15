import { ListenerRegistry } from "@server/infrastructure/events/ListenerRegistry.ts";
import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { ConnectionCommandRequest } from "../messaging/ConnectionCommandRequest.ts";
import { ConnectionCommandResponse } from "../messaging/ConnectionCommandResponse.ts";

export class ConnectionCommandRequestEntity implements Entity<number, ConnectionCommandRequest> {
  static create(id: number, request: ConnectionCommandRequest): ConnectionCommandRequestEntity {
    return new ConnectionCommandRequestEntity(id, request, ListenerRegistry.create());
  }

  private constructor(
    public readonly id: number,
    public readonly value: ConnectionCommandRequest,
    public readonly listeners: ListenerRegistry<ConnectionCommandResponse>,
  ) {}
}
