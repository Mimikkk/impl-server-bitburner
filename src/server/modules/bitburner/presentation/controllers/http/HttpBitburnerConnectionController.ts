import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { BitburnerCommandService } from "@server/modules/bitburner/application/services/BitburnerCommandService.ts";
import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";
import { HttpBitburnerRequestContent } from "@server/modules/bitburner/presentation/messaging/http/requests/HttpBitburnerRequestContent.ts";
import { HttpBitburnerCommandResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerCommandResponse.ts";
import { HttpBitburnerConnectionResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerConnectionResponse.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { HttpBitburnerRequestParameter } from "../../messaging/http/requests/HttpBitburnerRequestParameter.ts";

@ControllerNs.controller({ name: "HTTP Bitburner connection", group: "connections" })
export class HttpBitburnerConnectionController {
  static create(
    connections: BitburnerConnectionService = BitburnerConnectionService.create(),
    commands: BitburnerCommandService = BitburnerCommandService.create(),
  ) {
    return new HttpBitburnerConnectionController(connections, commands);
  }

  private constructor(
    private readonly connections: BitburnerConnectionService,
    private readonly commands: BitburnerCommandService,
  ) {}

  @RouteNs.get("")
  @OpenApiNs.route({
    description: "Get all connections",
    summary: "Get all connections",
    tags: [OpenApiTag.Connections],
    responses: [HttpBitburnerConnectionResponse.Multiple],
  })
  index(): Response {
    const connections = Array.from(this.connections.all());

    return HttpBitburnerConnectionResponse.multiple(connections);
  }

  @RouteNs.get(HttpBitburnerRequestParameter.ConnectionId)
  @OpenApiNs.route({
    description: "Get a connection by id",
    summary: "Get a connection by id",
    tags: [OpenApiTag.Connections],
    responses: [HttpBitburnerConnectionResponse.Single, HttpBitburnerConnectionResponse.Missing],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
  })
  show({ parameters: { values: { connectionId } } }: RouteRequestContext<{ connectionId: number }>): Response {
    const connection = this.connections.find(connectionId);

    if (connection === undefined) {
      return HttpBitburnerConnectionResponse.missing(connectionId);
    }

    return HttpBitburnerConnectionResponse.single(connection);
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/dispatch/${HttpBitburnerRequestParameter.CommandName}`)
  @OpenApiNs.route({
    description: "Dispatch a command to a connection",
    summary: "Dispatch a command to a connection",
    tags: [OpenApiTag.Connections],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpJsonResponse.Created,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId, HttpBitburnerRequestParameter.CommandName],
    content: HttpBitburnerRequestContent.Command,
  })
  dispatch(
    { parameters: { values: { connectionId, commandName: name } }, content }: RouteRequestContext<
      { connectionId: number; commandName: string },
      { values: object }
    >,
  ): Response {
    const connection = this.connections.find(connectionId);
    if (connection === undefined) {
      return HttpBitburnerConnectionResponse.missing(connectionId);
    }

    const command = this.commands.find(name);
    if (command === undefined) {
      return HttpBitburnerCommandResponse.missing(name);
    }

    const request = command.request(content.values);
    if (ValidationError.is(request)) {
      return HttpJsonResponse.validation(request);
    }

    connection.value.send(request.value);

    return HttpJsonResponse.created();
  }
}
