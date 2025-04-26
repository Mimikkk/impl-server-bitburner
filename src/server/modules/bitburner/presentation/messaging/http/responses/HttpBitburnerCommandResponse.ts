import { CommandResourceNs } from "@server/modules/bitburner/application/resources/CommandResource.ts";
import { CommandModel } from "@server/modules/commands/domain/models/CommandModel.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { CommandResponse } from "@server/modules/commands/presentation/messaging/rpc/responses/CommandResponse.ts";

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
    status: 200,
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
    status: 200,
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

  export const [Resolved, resolved] = HttpJsonResponse.custom({
    content: (response: CommandResponse) => ({ response: response }),
    example: { response: { id: 1 } },
    name: "Resolved command",
    description: "Command resolved",
    status: 200,
    schema: {
      type: "object",
      properties: {
        response: { type: "object" },
      },
    },
  });
}
