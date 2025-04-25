import { PathParameter } from "@server/presentation/messaging/http/parameters/PathParameter.ts";

export namespace HttpBitburnerParameter {
  export const ConnectionId = PathParameter.integer({
    name: "connectionId",
    description: "The id of the connection",
  });

  export const CommandName = PathParameter.string({
    name: "name",
    description: "The name of the command",
  });
}
