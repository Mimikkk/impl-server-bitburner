import { BitburnerCommands } from "@server/domain/modules/bitburner/commands/BitburnerCommand.enum.ts";
import { CommandRegistry } from "@server/domain/modules/commands/Command.registry.ts";

export class BitburnerCommandRegistry {
  static create() {
    return new BitburnerCommandRegistry();
  }

  private constructor(
    public readonly registry: CommandRegistry = BitburnerCommands.registry,
  ) {}
}
