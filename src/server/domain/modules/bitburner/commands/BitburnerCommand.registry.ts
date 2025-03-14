import { BitburnerCommands } from "@server/domain/modules/bitburner/commands/BitburnerCommand.enum.ts";

export class BitburnerCommandRegistry {
  static create() {
    return new BitburnerCommandRegistry();
  }

  private constructor(
    public readonly registry = BitburnerCommands.registry,
  ) {}
}
