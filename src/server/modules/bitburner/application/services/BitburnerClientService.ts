import { FileSystemWriter } from "@server/infrastructure/files/writers/FileSystemWriter.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";
import { BitburnerCommands } from "@server/modules/bitburner/domain/BitburnerCommands.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";
import { RpcJsonResponseResult } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";
import { resolve } from "@std/path/resolve";

export class BitburnerClientService {
  static create() {
    return new BitburnerClientService();
  }

  private constructor(
    private readonly writer = FileSystemWriter.create(),
    private readonly connections = BitburnerConnectionService.create(),
  ) {}

  async updateTypeDefinitions(response: CommandResponse): Promise<boolean> {
    const content = (response as RpcJsonResponseResult<string>).result;
    return await this.writer.write("src/client/declaration.d.ts", content);
  }

  canSync() {
    return !!this.connections.any();
  }

  async syncClient() {
    return "success";
  }

  async syncServer() {
    const connection = this.connections.any();
    if (connection === undefined) {
      return "no-connection-available";
    }

    const request = BitburnerCommands.list.request({ server: "home" });
    if (ValidationError.is(request)) {
      return "invalid-request";
    }

    const response = await connection.value.promise(request.value);
    if (response === undefined) {
      return "invalid-response";
    }

    const files = (response as RpcJsonResponseResult<{ content: string; filename: string }[]>).result;

    const directory = resolve("src/client/servers/home");
    Deno.remove(directory, { recursive: true });
    Deno.mkdir(directory, { recursive: true });

    for (const file of files) {
      await this.writer.write(`src/client/servers/home/${file.filename}`, file.content);
    }

    return "success";
  }
}
