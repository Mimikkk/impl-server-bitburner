import { ListenerRegistry } from "@server/infrastructure/events/ListenerRegistry.ts";
import { CommandRequest } from "@server/modules/commands/infrastructure/messaging/requests/CommandRequest.ts";
import { CommandResponse } from "@server/modules/commands/infrastructure/messaging/responses/CommandResponse.ts";
import { Model } from "../../../infrastructure/persistence/models/Model.ts";

export class CommandRequestModel implements Model<number, CommandRequest> {
  static create(id: number, request: CommandRequest): CommandRequestModel {
    return new CommandRequestModel(id, request, ListenerRegistry.create());
  }

  private constructor(
    public readonly id: number,
    public readonly value: CommandRequest,
    public readonly listeners: ListenerRegistry<CommandResponse>,
  ) {}
}
