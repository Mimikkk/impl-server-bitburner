import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { ModelFactory } from "@server/infrastructure/persistence/models/factories/ModelFactory.ts";
import { CommandRequest } from "@server/modules/commands/infrastructure/messaging/requests/CommandRequest.ts";
import { CommandRequestModel } from "@server/modules/commands/models/CommandRequestModel.ts";

export class CommandRequestModelFactory implements ModelFactory<CommandRequestModel> {
  static create(identifiers: IntGenerator = IntGenerator.create()): CommandRequestModelFactory {
    return new CommandRequestModelFactory(identifiers);
  }

  private constructor(
    private readonly identifiers: IntGenerator,
  ) {}

  create(value: CommandRequest): CommandRequestModel {
    return CommandRequestModel.create(this.identifiers.generate(), value);
  }
}
