import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";
import { CommandRequestEntity } from "@server/modules/commands/domain/entities/CommandRequestEntity.ts";

export interface CommandRequestRepository extends Repository<CommandRequestEntity> {
  resolve(response: CommandResponse): CommandRequestEntity | undefined;
}
