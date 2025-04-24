import { HttpJsonResponse } from "@server/infrastructure/messaging/http/responses/HttpJsonResponse.ts";
import { CommandResourceNs } from "@server/modules/bitburner/application/resources/CommandResource.ts";
import { CommandModel } from "@server/modules/commands/domain/models/CommandModel.ts";

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
    name: "Single command",
    description: "Single command",
    status: 200,
  });

  export const [Missing, missing] = HttpJsonResponse.custom({
    content: (name: string) => ({ name, message: "Command not found" }),
    example: { name: "Command 1", message: "Command not found" },
    name: "Missing command",
    description: "Command not found",
    status: 404,
  });
}
