import { BitburnerCommands } from "@server/modules/bitburner/domain/BitburnerCommands.ts";
import { PathParameter } from "@server/presentation/messaging/http/parameters/PathParameter.ts";

export namespace HttpBitburnerParameter {
  export const ConnectionId = PathParameter.integer({
    name: "connectionId",
    description: "The id of the connection",
  });

  const options = Array.from(BitburnerCommands.all.list()).map((command) => command.name);
  export const CommandName = PathParameter.string({
    name: "name",
    description: "The name of the command",
    example: BitburnerCommands.definition.name,
    options,
  });
}
