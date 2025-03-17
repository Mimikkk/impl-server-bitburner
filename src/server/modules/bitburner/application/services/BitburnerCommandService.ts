import { Command } from "../../../commands/entities/Command.ts";
import { BitburnerCommands } from "../../domain/BitburnerCommands.ts";

export class BitburnerCommandService {
  static create() {
    return new BitburnerCommandService();
  }

  private constructor(
    private readonly commands = BitburnerCommands.all,
  ) {}

  find(name: string): Command | undefined {
    return this.commands.find(name);
  }

  list(): IterableIterator<Command> {
    return this.commands.list();
  }
}
