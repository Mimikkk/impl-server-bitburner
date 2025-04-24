import { BitburnerCommands } from "@server/modules/bitburner/domain/BitburnerCommands.ts";
import { CommandModel } from "@server/modules/commands/domain/models/CommandModel.ts";

export class BitburnerCommandService {
  static create() {
    return new BitburnerCommandService();
  }

  private constructor(
    private readonly commands = BitburnerCommands.all,
  ) {}

  find(name: string): CommandModel | undefined {
    return this.commands.find(name);
  }

  list(): IterableIterator<CommandModel> {
    return this.commands.list();
  }
}
