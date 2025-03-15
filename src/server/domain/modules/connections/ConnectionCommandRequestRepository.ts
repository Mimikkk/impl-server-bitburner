import { Repository } from "@server/infrastructure/persistence/repositories/Repository.ts";
import { ConnectionCommandRequestEntity } from "./entities/ConnectionCommandRequestEntity.ts";
import { ConnectionCommandResponse } from "./messaging/ConnectionCommandResponse.ts";

export interface ConnectionCommandRequestRepository extends Repository<ConnectionCommandRequestEntity> {
  resolve(response: ConnectionCommandResponse): ConnectionCommandRequestEntity | undefined;
}
