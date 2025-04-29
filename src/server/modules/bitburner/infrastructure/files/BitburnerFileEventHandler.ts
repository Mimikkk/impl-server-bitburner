import { colors } from "@cliffy/ansi/colors";
import { BitburnerFileSystemClientManager } from "@server/modules/bitburner/infrastructure/files/BitburnerFileSystemClientManager.ts";
import { BitburnerFileSystemServerManager } from "@server/modules/bitburner/infrastructure/files/BitburnerFileSystemServerManager.ts";
import { ConnectionModel } from "@server/modules/connections/domain/models/ConnectionModel.ts";
import { Log } from "@shared/logging/log.ts";
import { resolve } from "@std/path/resolve";

const c = colors.yellow;
const g = colors.green;
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
    const path = resolve(event.paths[0]);
    const startPath = resolve("src/client/servers/home");
    const clientPath = path.replace(startPath + "\\", "");

    Log.event(`${c("[file]")} ${g(event.kind)} ${c(clientPath)}`);
    if (event.kind === "create" || event.kind === "modify") {
      const stat = await Deno.stat(path);
      if (!stat.isFile) return;

      const content = await this.server.read(clientPath);
      if (content === undefined) return;

      await this.client.update(clientPath, content);
      Log.event(`${c("[file]")} updated ${c(clientPath)} on the client.`);
    } else if (event.kind === "remove") {
      await this.client.remove(clientPath);
      Log.event(`${c("[file]")} removed ${c(clientPath)} from the client.`);
    }
  }
}
