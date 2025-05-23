import { EntityFactory } from "@server/infrastructure/persistence/entities/factories/EntityFactory.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { CommandRequestEntity } from "@server/modules/commands/domain/entities/CommandRequestEntity.ts";
import { CommandRequest } from "@server/modules/commands/presentation/messaging/rpc/requests/CommandRequest.ts";

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
