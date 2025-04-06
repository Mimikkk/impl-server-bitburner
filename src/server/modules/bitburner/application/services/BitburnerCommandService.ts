import { CommandModel } from "../../../commands/models/CommandModel.ts";
import { BitburnerCommands } from "../../domain/BitburnerCommands.ts";

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
