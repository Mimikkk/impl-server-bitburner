import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { BitburnerCommandService } from "@server/modules/bitburner/application/services/BitburnerCommandService.ts";
import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";
import { BitburnerCommands } from "@server/modules/bitburner/domain/BitburnerCommands.ts";
import { HttpBitburnerRequestContent } from "@server/modules/bitburner/presentation/messaging/http/requests/HttpBitburnerRequestContent.ts";
import { HttpBitburnerCommandResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerCommandResponse.ts";
import { HttpBitburnerConnectionResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerConnectionResponse.ts";
import { CommandModel } from "@server/modules/commands/domain/models/CommandModel.ts";
import { CommandRequest } from "@server/modules/commands/presentation/messaging/rpc/requests/CommandRequest.ts";
import { ConnectionModel } from "@server/modules/connections/domain/models/ConnectionModel.ts";
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

  @RouteNs.post(
    `${HttpBitburnerRequestParameter.ConnectionId}/dispatch/${HttpBitburnerRequestParameter.CommandName}`,
  )
  @OpenApiNs.route({
    description: "Dispatch a command to a connection",
    summary: "Dispatch a command to a connection asynchronously",
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
      { values: object } | null
    >,
  ): Response {
    const result = this.tryConnectionCommand(connectionId, name, content?.values);
    if (result instanceof Response) {
      return result;
    }

    const { connection, request } = result;
    connection.send(request);

    return HttpJsonResponse.created();
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/dispatch/${BitburnerCommands.definition.name}`)
  @OpenApiNs.route({
    description: "Dispatch a bitburner namespace definition command",
    summary: "Dispatch a bitburner namespace definition command asynchronously",
    tags: [OpenApiTag.Connections],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Resolved,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
  })
  dispatchDefinition(context: RouteRequestContext<{ connectionId: number }, null>): Response {
    return this.dispatch(context.withParameters({ commandName: BitburnerCommands.definition.name }));
  }

  @RouteNs.post(
    `${HttpBitburnerRequestParameter.ConnectionId}/execute/${HttpBitburnerRequestParameter.CommandName}`,
  )
  @OpenApiNs.route({
    description: "Execute a command",
    summary: "Executes a command and waits for the result",
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
  async read(
    { parameters: { values: { connectionId, commandName: name } }, content }: RouteRequestContext<
      { connectionId: number; commandName: string },
      { values: object } | null
    >,
  ): Promise<Response> {
    const result = this.tryConnectionCommand(connectionId, name, content?.values);
    if (result instanceof Response) {
      return result;
    }

    const { connection, request } = result;
    const response = await connection.promise(request);
    if (response === undefined) {
      return HttpJsonResponse.failure();
    }

    return HttpBitburnerCommandResponse.resolved(response);
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/execute/${BitburnerCommands.definition.name}`)
  @OpenApiNs.route({
    description: "Execute bitburner namespace definition",
    summary: "Executes a bitburner namespace definition command and waits for the result",
    tags: [OpenApiTag.Connections],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Resolved,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
  })
  readDefinition(context: RouteRequestContext<{ connectionId: number }, null>): Promise<Response> {
    return this.read(context.withParameters({ commandName: BitburnerCommands.definition.name }));
  }

  private tryConnectionCommand(
    connectionId: number,
    commandName: string,
    payload: object | null,
  ): Response | { connection: ConnectionModel; command: CommandModel; request: CommandRequest } {
    const connection = this.connections.find(connectionId);

    if (connection === undefined) {
      return HttpBitburnerConnectionResponse.missing(connectionId);
    }

    const command = this.commands.find(commandName);
    if (command === undefined) {
      return HttpBitburnerCommandResponse.missing(commandName);
    }

    const request = command.request(payload);
    if (ValidationError.is(request)) {
      return HttpJsonResponse.validation(request);
    }

    return {
      connection: connection.value,
      request: request.value,
      command,
    };
  }
}
