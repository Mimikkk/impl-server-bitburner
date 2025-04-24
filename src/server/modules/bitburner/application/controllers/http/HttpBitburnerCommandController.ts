import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { HttpBitburnerCommandResponse } from "../../messaging/responses/HttpBitburnerCommandResponse.ts";
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

    return HttpBitburnerCommandResponse.multiple(commands);
  }

  show({ parameters: { values: { name } } }: RouteRequestContext<{ name: string }>): Response {
    const command = this.commands.find(name);

    if (command === undefined) {
      return HttpBitburnerCommandResponse.missing(name);
    }

    return HttpBitburnerCommandResponse.single(command);
  }
}
