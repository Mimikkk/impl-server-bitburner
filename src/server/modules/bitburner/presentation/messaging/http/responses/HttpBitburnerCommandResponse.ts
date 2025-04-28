import { CommandResourceNs } from "@server/modules/bitburner/application/resources/CommandResource.ts";
import { CommandModel } from "@server/modules/commands/domain/models/CommandModel.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { RpcJsonResponse } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";
import { SchemaObject } from "openapi3-ts/oas31";

export namespace HttpBitburnerCommandResponse {
  export const [Multiple, multiple] = HttpJsonResponse.custom({
    content: (commands: CommandModel[]) => ({ commands: CommandResourceNs.fromCommands(commands) }),
    example: {
      commands: [
        {
          name: "Command 1",
          method: "GET",
          description: "Command 1 description",
        },
      ],
    },
    schema: {
      type: "object",
      properties: {
        commands: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              method: { type: "string" },
              description: { type: "string" },
            },
          },
        },
      },
    },
    name: "Multiple commands",
    description: "Multiple commands",
    status: 201,
  });

  export const [Single, single] = HttpJsonResponse.custom({
    content: (command: CommandModel) => CommandResourceNs.fromCommand(command),
    example: {
      name: "Command 1",
      method: "GET",
      description: "Command 1 description",
    },
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        method: { type: "string" },
        description: { type: "string" },
      },
    },
    name: "Single command",
    description: "Single command",
    status: 201,
  });

  export const [Missing, missing] = HttpJsonResponse.custom({
    content: (name: string) => ({ name, message: "Command not found" }),
    example: { name: "Command 1", message: "Command not found" },
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        message: { type: "string" },
      },
    },
    name: "Missing command",
    description: "Command not found",
    status: 404,
  });

  export const [Dispatched, dispatched] = HttpJsonResponse.custom({
    content: (requestId: number) => ({ requestId }),
    example: { requestId: 1 },
    name: "Dispatched command",
    description: "Command dispatched successfully",
    status: 201,
    schema: { type: "object", properties: { requestId: { type: "number" } } },
  });

  const createContent = (response: CommandResponse) => {
    if (RpcJsonResponse.isError(response)) {
      return { responseId: response.id, error: response.error };
    }

    return { responseId: response.id, result: response.result };
  };
  const createExample = <T>(result: T) => ({ responseId: 1, result }) as const;
  const createSchema = (result: SchemaObject): SchemaObject => ({
    type: "object",
    properties: { responseId: { type: "number" }, result },
  });

  export const [Command, command] = HttpJsonResponse.custom({
    content: createContent,
    example: createExample("example result"),
    name: "Command",
    description: "Command response content",
    status: 201,
    schema: createSchema({ type: ["string", "array", "number", "object"] }),
  });

  export const [Update, update] = HttpJsonResponse.custom({
    content: createContent,
    example: createExample("OK"),
    name: "Update command",
    description: "Command to update a file on a server",
    status: 201,
    schema: createSchema({ type: "string" }),
  });

  export const [Remove, remove] = HttpJsonResponse.custom({
    content: createContent,
    example: createExample("OK"),
    name: "Remove command",
    description: "Command to remove a file on a server",
    status: 201,
    schema: createSchema({ type: "string" }),
  });

  export const [Read, read] = HttpJsonResponse.custom({
    content: createContent,
    example: createExample("example result"),
    name: "Read command",
    description: "Command to read a file on a server",
    status: 201,
    schema: createSchema({ type: "string" }),
  });

  export const [List, list] = HttpJsonResponse.custom({
    content: createContent,
    example: createExample(["example result"]),
    name: "List command",
    description: "Command to list all files on a server",
    status: 201,
    schema: createSchema({ type: "array", items: { type: "string" } }),
  });

  export const [Names, names] = HttpJsonResponse.custom({
    content: createContent,
    example: createExample(["example result"]),
    name: "Names command",
    description: "Command to list all file names on a server",
    status: 201,
    schema: createSchema({ type: "array", items: { type: "string" } }),
  });

  export const [Ram, ram] = HttpJsonResponse.custom({
    content: createContent,
    example: createExample(100),
    name: "Ram command",
    description: "Command to calculate the RAM usage of a file on a server",
    status: 201,
    schema: createSchema({ type: "number" }),
  });

  export const [Definition, definition] = HttpJsonResponse.custom({
    content: createContent,
    example: createExample("example result"),
    name: "Definition command",
    description: "Command to get the definition of a file on a server",
    status: 201,
    schema: createSchema({ type: "string" }),
  });
}
