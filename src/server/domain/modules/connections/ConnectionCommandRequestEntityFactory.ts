import { EntityFactory } from "@server/infrastructure/persistence/entities/factories/EntityFactory.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { ConnectionCommandRequest } from "./ConnectionCommandRequest.ts";
import { ConnectionCommandRequestEntity } from "./ConnectionCommandRequestEntity.ts";

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
