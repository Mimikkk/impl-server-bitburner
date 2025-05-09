import { RequestContent } from "@server/presentation/messaging/http/content/RequestContent.ts";

export namespace HttpBitburnerRequestContent {
  export const Command = RequestContent.create({
    name: "command",
    example: { server: "home" },
    description: "Example body of the command",
    properties: { server: { type: "string" } },
  });

  export const Update = RequestContent.create({
    name: "update",
    example: { filename: "example", content: "example", server: "home" },
    description: "Update a file on a server",
    properties: { filename: { type: "string" }, content: { type: "string" }, server: { type: "string" } },
  });

  export const Remove = RequestContent.create({
    name: "remove",
    example: { filename: "example", server: "home" },
    description: "Remove a file from a server",
    properties: { filename: { type: "string" }, server: { type: "string" } },
  });

  export const Read = RequestContent.create({
    name: "read",
    example: { filename: "example", server: "home" },
    description: "Read a file from a server",
    properties: { filename: { type: "string" }, server: { type: "string" } },
  });

  export const List = RequestContent.create({
    name: "list",
    example: { server: "home" },
    description: "List all files on a server",
    properties: { server: { type: "string" } },
  });

  export const Names = RequestContent.create({
    name: "names",
    example: { server: "home" },
    description: "List all file names on a server",
    properties: { server: { type: "string" } },
  });

  export const Ram = RequestContent.create({
    name: "ram",
    example: { filename: "example", server: "home" },
    description: "Calculate the RAM usage of a file on a server",
    properties: { filename: { type: "string" }, server: { type: "string" } },
  });

  export const Definition = RequestContent.create({
    name: "definition",
    example: {},
    description: "Get the definition of a file on a server",
    properties: {},
  });
}
