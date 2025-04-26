import { RequestContent } from "@server/presentation/messaging/http/content/RequestContent.ts";

export namespace HttpBitburnerRequestContent {
  export const Command = RequestContent.create({
    name: "command",
    example: { name: "example" },
    description: "Example body of the command",
    properties: { name: { type: "string" } },
  });
}
