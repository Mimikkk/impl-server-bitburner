import { EntityFactory } from "@server/infrastructure/persistence/entities/factories/EntityFactory.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { CommandRequest } from "@server/modules/commands/application/messaging/http/requests/CommandRequest.ts";
import { CommandRequestEntity } from "@server/modules/commands/domain/entities/CommandRequestEntity.ts";

export class CommandRequestEntityFactory implements EntityFactory<CommandRequestEntity> {
  static create(identifiers: IntGenerator = IntGenerator.create()): CommandRequestEntityFactory {
    return new CommandRequestEntityFactory(identifiers);
  }

  private constructor(
    private readonly identifiers: IntGenerator,
  ) {}

  create(value: CommandRequest): CommandRequestEntity {
    return CommandRequestEntity.create(this.identifiers.generate(), value);
  }
}
