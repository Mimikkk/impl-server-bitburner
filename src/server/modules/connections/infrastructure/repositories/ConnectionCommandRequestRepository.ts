import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { ConnectionCommandRequestEntity } from "@server/modules/connections/domain/entities/ConnectionCommandRequestEntity.ts";
import { ConnectionCommandResponse } from "../messaging/responses/ConnectionCommandResponse.ts";

export interface ConnectionCommandRequestRepository extends Repository<ConnectionCommandRequestEntity> {
  resolve(response: ConnectionCommandResponse): ConnectionCommandRequestEntity | undefined;
}
