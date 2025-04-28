import { FileSystemWriter } from "@server/infrastructure/files/writers/FileSystemWriter.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";
import { RpcJsonResponseResult } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";

export class BitburnerClientService {
  static create() {
    return new BitburnerClientService();
  }

  private constructor(
    private readonly writer = FileSystemWriter.create(),
  ) {}

  async updateTypeDefinitions(response: CommandResponse): Promise<boolean> {
    const content = (response as RpcJsonResponseResult<string>).result;
    return await this.writer.write("src/client/declaration.d.ts", content);
  }
}
