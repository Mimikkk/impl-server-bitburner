import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { CommandRequestEntity } from "@server/modules/commands/entities/CommandRequestEntity.ts";
import { CommandResponse } from "@server/modules/commands/infrastructure/messaging/responses/CommandResponse.ts";

export interface CommandRequestRepository extends Repository<CommandRequestEntity> {
  resolve(response: CommandResponse): CommandRequestEntity | undefined;
}
