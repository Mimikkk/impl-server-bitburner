import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { BitburnerCommandService } from "../../services/BitburnerCommandService.ts";

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

    return HttpJsonResponse.success({ commands });
  }

  show({ parameters: { values: { name } } }: RouteRequestContext<{ name: string }>): Response {
    const command = this.commands.find(name);

    if (command === undefined) {
      return HttpJsonResponse.missing({ name, message: "Command not found" });
    }

    return HttpJsonResponse.success({ command });
  }
}
