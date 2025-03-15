import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { ConnectionCommandRequestEntity } from "./ConnectionCommandRequestEntity.ts";
import { ConnectionCommandResponse } from "./ConnectionCommandResponse.ts";

export interface ConnectionCommandRequestRepository extends Repository<ConnectionCommandRequestEntity> {
  resolve(response: ConnectionCommandResponse): ConnectionCommandRequestEntity | undefined;
}
