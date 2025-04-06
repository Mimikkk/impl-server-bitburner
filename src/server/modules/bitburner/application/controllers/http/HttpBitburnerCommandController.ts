import { HttpJsonResponseNs } from "@server/infrastructure/messaging/responses/HttpJsonResponseNs.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { CommandResourceNs } from "@server/modules/bitburner/application/resources/CommandResource.ts";
import { CommandModel } from "@server/modules/commands/models/CommandModel.ts";
import { BitburnerCommandService } from "../../services/BitburnerCommandService.ts";

export namespace HttpBitburnerCommandControllerResponseNs {
  export const [Multiple, multiple] = HttpJsonResponseNs.custom({
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
    name: "Arbitrary HTML response",
    description: "Arbitrary HTML response",
    status: 200,
  });

  export const [Single, single] = HttpJsonResponseNs.custom({
    content: (command: CommandModel) => CommandResourceNs.fromCommand(command),
    example: {
      name: "Command 1",
      method: "GET",
      description: "Command 1 description",
    },
    name: "Arbitrary HTML response",
    description: "Arbitrary HTML response",
    status: 200,
  });

  export const [Missing, missing] = HttpJsonResponseNs.custom({
    content: (name: string) => ({ name, message: "Command not found" }),
    example: { name: "Command 1", message: "Command not found" },
    name: "Command not found",
    description: "Command not found",
    status: 404,
  });
}

export class HttpBitburnerCommandController {
  static create(
    commands: BitburnerCommandService = BitburnerCommandService.create(),
  ) {
    return new HttpBitburnerCommandController(commands);
  }

  private constructor(
    private readonly commands: BitburnerCommandService,
  ) {}

  index(): Response {
    const commands = Array.from(this.commands.list());

    return HttpBitburnerCommandControllerResponseNs.multiple(commands);
  }

  show({ parameters: { values: { name } } }: RouteRequestContext<{ name: string }>): Response {
    const command = this.commands.find(name);

    if (command === undefined) {
      return HttpBitburnerCommandControllerResponseNs.missing(name);
    }

    return HttpBitburnerCommandControllerResponseNs.single(command);
  }
}
