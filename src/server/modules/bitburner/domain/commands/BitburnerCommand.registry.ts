import { BitburnerCommands } from "@server/modules/bitburner/domain/commands/BitburnerCommand.enum.ts";

export class BitburnerCommandRegistry {
  static create() {
    return new BitburnerCommandRegistry();
  }

  private constructor(
    public readonly registry = BitburnerCommands.registry,
  ) {}
}
