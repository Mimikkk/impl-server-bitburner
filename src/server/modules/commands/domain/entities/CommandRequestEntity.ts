import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { CommandRequest } from "@server/modules/commands/presentation/messaging/rpc/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";
import { VolatileListenerRegistry } from "../../../../infrastructure/events/VolatileListenerRegistry.ts";

export class CommandRequestEntity implements Entity<number, CommandRequest> {
  static create(id: number, request: CommandRequest): CommandRequestEntity {
    return new CommandRequestEntity(id, request, VolatileListenerRegistry.create());
  }

  private constructor(
    public readonly id: number,
    public readonly value: CommandRequest,
    public readonly listeners: VolatileListenerRegistry<CommandResponse>,
  ) {}
}
