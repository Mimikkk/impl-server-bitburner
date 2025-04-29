import { colors } from "@cliffy/ansi/colors";
import { BitburnerFileSystemServerManager } from "@server/modules/bitburner/infrastructure/files/BitburnerFileSystemServerManager.ts";
import { Log } from "@shared/logging/log.ts";

export class BitburnerFileEventHandler {
  static create() {
    return new BitburnerFileEventHandler();
  }

  private constructor(
    private readonly server = BitburnerFileSystemServerManager.create(),
  ) {}

  async handle(event: Deno.FsEvent): Promise<void> {
    Log.event(`${colors.yellow("[file]")} ${event.kind} ${event.paths[0]}`);
  }
}
