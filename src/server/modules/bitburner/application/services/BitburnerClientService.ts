import { FileSystemReader } from "@server/infrastructure/files/readers/FileSystemReader.ts";
import { FileSystemWriter } from "@server/infrastructure/files/writers/FileSystemWriter.ts";
import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";
import { BitburnerCommands } from "@server/modules/bitburner/domain/BitburnerCommands.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";
import { RpcJsonResponseResult } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";
import { resolve } from "@std/path/resolve";
import { FileSystemManager } from "../../../../infrastructure/files/managers/FileSystemManager.ts";

export class BitburnerClientService {
  static create() {
    return new BitburnerClientService();
  }

  private constructor(
    private readonly writer = FileSystemWriter.create("src/client"),
    private readonly reader = FileSystemReader.create("src/client"),
    private readonly connections = BitburnerConnectionService.create(),
    private readonly manager = FileSystemManager.create("src/client"),
  ) {}

  async updateTypeDefinitions(response: CommandResponse): Promise<boolean> {
    const content = (response as RpcJsonResponseResult<string>).result;
    return await this.writer.write("declaration.d.ts", content);
  }

  canSync() {
    return !!this.connections.any();
  }

  async syncClient() {
    const connectionResult = this.connections.any();
    if (connectionResult === undefined) {
      return "no-connection-available";
    }
    const server = "home";
    const connection = connectionResult.value;

    const namesResult = await connection.command(BitburnerCommands.names, { server });
    if (namesResult === "internal-error" || namesResult === "invalid-request" || namesResult === "invalid-response") {
      return "name-command-failed";
    }
    const clientFileNames = namesResult.map((filename) => filename);

    const removeResults = await Promise.all(
      clientFileNames.map((filename) => connection.command(BitburnerCommands.remove, { server, filename })),
    );
    for (const result of removeResults) {
      if (result === "internal-error" || result === "invalid-request" || result === "invalid-response") {
        return "remove-command-failed";
      }
    }

    const serverFileNames = await this.manager.list({ path: "servers/home", recursive: true });
    const contents = await Promise.all(
      serverFileNames.map((filename) => this.reader.readStr(`src/client/servers/home/${filename}`)),
    ) as string[];

    const pushResults = await Promise.all(
      serverFileNames.map((filename, index) =>
        connection.command(BitburnerCommands.update, { server, filename, content: contents[index] })
      ),
    );
    for (const result of pushResults) {
      if (result === "internal-error" || result === "invalid-request" || result === "invalid-response") {
        return "push-command-failed";
      }
    }

    return "success";
  }

  async syncServer() {
    const connectionResult = this.connections.any();
    if (connectionResult === undefined) {
      return "no-connection-available";
    }
    const connection = connectionResult.value;

    const filesResult = await connection.command(BitburnerCommands.list, { server: "home" });
    if (filesResult === "internal-error" || filesResult === "invalid-request" || filesResult === "invalid-response") {
      return "list-command-failed";
    }

    const directory = resolve("src/client/servers/home");
    Deno.remove(directory, { recursive: true });
    Deno.mkdir(directory, { recursive: true });

    for (const file of filesResult) {
      await this.writer.write(`src/client/servers/home/${file.filename}`, file.content);
    }

    return "success";
  }
}
