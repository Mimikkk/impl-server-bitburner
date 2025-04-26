import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { BitburnerCommandService } from "@server/modules/bitburner/application/services/BitburnerCommandService.ts";
import { HttpBitburnerCommandResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerCommandResponse.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { HttpBitburnerRequestContent } from "../../messaging/http/requests/HttpBitburnerRequestContent.ts";
import { HttpBitburnerRequestParameter } from "../../messaging/http/requests/HttpBitburnerRequestParameter.ts";

@ControllerNs.controller({ name: "HTTP Bitburner command", group: "commands" })
export class HttpBitburnerCommandController {
  static create(
    commands: BitburnerCommandService = BitburnerCommandService.create(),
  ) {
    return new HttpBitburnerCommandController(commands);
  }

  private constructor(
    private readonly commands: BitburnerCommandService,
  ) {}

  @RouteNs.get("")
  @OpenApiNs.route({
    description: "Get all commands",
    summary: "Get all commands",
    tags: [OpenApiTag.Commands],
    responses: [HttpBitburnerCommandResponse.Multiple],
  })
  index(): Response {
    const commands = Array.from(this.commands.list());

    return HttpBitburnerCommandResponse.multiple(commands);
  }

  @RouteNs.get(HttpBitburnerRequestParameter.CommandName)
  @OpenApiNs.route({
    description: "Get a command by name",
    summary: "Get a command by name",
    tags: [OpenApiTag.Commands],
    responses: [HttpBitburnerCommandResponse.Single, HttpBitburnerCommandResponse.Missing],
    parameters: [HttpBitburnerRequestParameter.CommandName],
  })
  show({ parameters: { values: { name } } }: RouteRequestContext<{ name: string }>): Response {
    const command = this.commands.find(name);

    if (command === undefined) {
      return HttpBitburnerCommandResponse.missing(name);
    }

    return HttpBitburnerCommandResponse.single(command);
  }

  @RouteNs.post(HttpBitburnerRequestParameter.CommandName)
  @OpenApiNs.route({
    description: "Run any command by name",
    summary: "Run any command by name",
    tags: [OpenApiTag.Commands],
    responses: [HttpBitburnerCommandResponse.Single, HttpBitburnerCommandResponse.Missing, HttpJsonResponse.Validation],
    parameters: [HttpBitburnerRequestParameter.CommandName],
    content: HttpBitburnerRequestContent.Command,
  })
  run(
    { parameters: { values: { name } }, content }: RouteRequestContext<
      { name: string },
      { values: object }
    >,
  ): Response {
    const command = this.commands.find(name);

    if (command === undefined) {
      return HttpBitburnerCommandResponse.missing(name);
    }

    const result = command.request(content.values);
    if (ValidationError.is(result)) {
      return HttpJsonResponse.validation(result);
    }

    return HttpBitburnerCommandResponse.single(command);
  }
}
