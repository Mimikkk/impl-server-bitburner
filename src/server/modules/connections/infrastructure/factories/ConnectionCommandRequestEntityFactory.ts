import { EntityFactory } from "@server/infrastructure/persistence/entities/factories/EntityFactory.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { ConnectionCommandRequestEntity } from "@server/modules/connections/domain/entities/ConnectionCommandRequestEntity.ts";
import { ConnectionCommandRequest } from "@server/modules/connections/infrastructure/messaging/requests/ConnectionCommandRequest.ts";

export class ConnectionCommandRequestEntityFactory implements EntityFactory<ConnectionCommandRequestEntity> {
  static create(identifiers: IntGenerator = IntGenerator.create()): ConnectionCommandRequestEntityFactory {
    return new ConnectionCommandRequestEntityFactory(identifiers);
  }

  private constructor(
    private readonly identifiers: IntGenerator,
  ) {}

  create(value: ConnectionCommandRequest): ConnectionCommandRequestEntity {
    return ConnectionCommandRequestEntity.create(this.identifiers.generate(), value);
  }
}
