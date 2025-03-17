import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { CommandResponse } from "@server/modules/commands/infrastructure/messaging/responses/CommandResponse.ts";
import { CommandRequestModel } from "../models/CommandRequestModel.ts";

export interface CommandRequestRepository extends Repository<CommandRequestModel> {
  resolve(response: CommandResponse): CommandRequestModel | undefined;
}
