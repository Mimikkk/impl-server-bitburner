import { ListenerRegistry } from "@server/infrastructure/events/ListenerRegistry.ts";
import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { CommandRequest } from "@server/modules/commands/application/messaging/http/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/application/messaging/http/responses/CommandResponse.ts";

export class CommandRequestEntity implements Entity<number, CommandRequest> {
  static create(id: number, request: CommandRequest): CommandRequestEntity {
    return new CommandRequestEntity(id, request, ListenerRegistry.create());
  }

  private constructor(
    public readonly id: number,
    public readonly value: CommandRequest,
    public readonly listeners: ListenerRegistry<CommandResponse>,
  ) {}
}
