import { colors } from "@cliffy/ansi/colors";
import { BitburnerFileSystemClientManager } from "@server/modules/bitburner/infrastructure/files/BitburnerFileSystemClientManager.ts";
import { BitburnerFileSystemServerManager } from "@server/modules/bitburner/infrastructure/files/BitburnerFileSystemServerManager.ts";
import { ConnectionModel } from "@server/modules/connections/domain/models/ConnectionModel.ts";
import { Log } from "@shared/logging/log.ts";

export class BitburnerFileEventHandler {
  static create(connection: ConnectionModel) {
    return new BitburnerFileEventHandler(connection);
  }

  private constructor(
    connection: ConnectionModel,
    private readonly server = BitburnerFileSystemServerManager.create(),
    private readonly client = BitburnerFileSystemClientManager.create(connection),
  ) {}

  async handle(event: Deno.FsEvent): Promise<void> {
    Log.event(`${colors.yellow("[file]")} ${event.kind} ${event.paths[0]}`);
    await Promise.resolve();
  }
}
