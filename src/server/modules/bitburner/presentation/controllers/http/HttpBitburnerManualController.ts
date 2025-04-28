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

@ControllerNs.controller({ name: "HTTP Bitburner manual", group: "manual" })
export class HttpBitburnerManualController {
  static create(
    connections: BitburnerConnectionService = BitburnerConnectionService.create(),
    commands: BitburnerCommandService = BitburnerCommandService.create(),
  ) {
    return new HttpBitburnerManualController(connections, commands);
  }

  private constructor(
    private readonly connections: BitburnerConnectionService,
    private readonly commands: BitburnerCommandService,
  ) {}

  @RouteNs.post(
    `${HttpBitburnerRequestParameter.ConnectionId}/commands/dispatch/${HttpBitburnerRequestParameter.CommandName}`,
  )
  @OpenApiNs.route({
    description: "Dispatch a command to a connection",
    summary: "Dispatch a command to a connection asynchronously",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Dispatched,
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
    const { id } = connection.send(request);

    return HttpBitburnerCommandResponse.dispatched(id);
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/dispatch/${BitburnerCommands.definition}`)
  @OpenApiNs.route({
    description: "Dispatch a command to send the namespace definition",
    summary: "Dispatch a command to send the namespace definition asynchronously",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Dispatched,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
  })
  dispatchDefinition(context: RouteRequestContext<{ connectionId: number }, null>): Response {
    return this.dispatch(context.withParameters({ commandName: BitburnerCommands.definition.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/dispatch/${BitburnerCommands.update.name}`)
  @OpenApiNs.route({
    description: "Dispatch a command to update a file on a server",
    summary: "Dispatch a command to update a file on a server asynchronously",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Dispatched,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Update,
  })
  dispatchUpdate(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Response {
    return this.dispatch(context.withParameters({ commandName: BitburnerCommands.update.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/dispatch/${BitburnerCommands.remove.name}`)
  @OpenApiNs.route({
    description: "Dispatch a command to remove a file from a server",
    summary: "Dispatch a command to remove a file from a server asynchronously",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Dispatched,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Remove,
  })
  dispatchRemove(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Response {
    return this.dispatch(context.withParameters({ commandName: BitburnerCommands.remove.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/dispatch/${BitburnerCommands.read.name}`)
  @OpenApiNs.route({
    description: "Dispatch a command to read a file from a server",
    summary: "Dispatch a command to read a file from a server asynchronously",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Dispatched,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Read,
  })
  dispatchRead(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Response {
    return this.dispatch(context.withParameters({ commandName: BitburnerCommands.read.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/dispatch/${BitburnerCommands.list.name}`)
  @OpenApiNs.route({
    description: "Dispatch a command to list all files on a server",
    summary: "Dispatch a command to list all files on a server asynchronously",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Dispatched,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.List,
  })
  dispatchList(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Response {
    return this.dispatch(context.withParameters({ commandName: BitburnerCommands.list.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/dispatch/${BitburnerCommands.names.name}`)
  @OpenApiNs.route({
    description: "Dispatch a command to list all file names on a server",
    summary: "Dispatch a command to list all file names on a server asynchronously",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Dispatched,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Names,
  })
  dispatchNames(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Response {
    return this.dispatch(context.withParameters({ commandName: BitburnerCommands.names.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/dispatch/${BitburnerCommands.ram.name}`)
  @OpenApiNs.route({
    description: "Dispatch a command to calculate the RAM usage of a file on a server",
    summary: "Dispatch a command to calculate the RAM usage of a file on a server asynchronously",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Dispatched,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Ram,
  })
  dispatchRam(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Response {
    return this.dispatch(context.withParameters({ commandName: BitburnerCommands.ram.name }));
  }

  @RouteNs.post(
    `${HttpBitburnerRequestParameter.ConnectionId}/commands/execute/${HttpBitburnerRequestParameter.CommandName}`,
  )
  @OpenApiNs.route({
    description: "Execute a command",
    summary: "Executes a command and waits for the result",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpJsonResponse.Created,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId, HttpBitburnerRequestParameter.CommandName],
    content: HttpBitburnerRequestContent.Command,
  })
  async execute(
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

    return HttpBitburnerCommandResponse.command(response);
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/execute/${BitburnerCommands.definition}`)
  @OpenApiNs.route({
    description: "Read the bitburner namespace definition",
    summary: "Executes a command to read the bitburner namespace definition",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Definition,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
  })
  readDefinition(context: RouteRequestContext<{ connectionId: number }, null>): Promise<Response> {
    return this.execute(context.withParameters({ commandName: BitburnerCommands.definition.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/execute/${BitburnerCommands.update}`)
  @OpenApiNs.route({
    description: "Update a file on a server",
    summary: "Execute a command to update a file on a server",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Update,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Update,
  })
  readUpdate(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Promise<Response> {
    return this.execute(context.withParameters({ commandName: BitburnerCommands.update.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/execute/${BitburnerCommands.remove}`)
  @OpenApiNs.route({
    description: "Remove a file on a server",
    summary: "Execute a command to remove a file on a server",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Remove,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Remove,
  })
  readRemove(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Promise<Response> {
    return this.execute(context.withParameters({ commandName: BitburnerCommands.remove.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/execute/${BitburnerCommands.list}`)
  @OpenApiNs.route({
    description: "Read all files on a server",
    summary: "Execute a command to read all files on a server",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.List,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.List,
  })
  readList(context: RouteRequestContext<{ connectionId: number }, null>): Promise<Response> {
    return this.execute(context.withParameters({ commandName: BitburnerCommands.list.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/execute/${BitburnerCommands.names}`)
  @OpenApiNs.route({
    description: "Read all file names on a server",
    summary: "Execute a command to read all file names on a server",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Names,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Names,
  })
  readNames(context: RouteRequestContext<{ connectionId: number }, null>): Promise<Response> {
    return this.execute(context.withParameters({ commandName: BitburnerCommands.names.name }));
  }

  @RouteNs.post(`${HttpBitburnerRequestParameter.ConnectionId}/commands/execute/${BitburnerCommands.ram}`)
  @OpenApiNs.route({
    description: "Read the RAM usage of a file on a server",
    summary: "Execute a command to read the RAM usage of a file on a server",
    tags: [OpenApiTag.Manual],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpBitburnerCommandResponse.Missing,
      HttpJsonResponse.Validation,
      HttpBitburnerCommandResponse.Ram,
    ],
    parameters: [HttpBitburnerRequestParameter.ConnectionId],
    content: HttpBitburnerRequestContent.Ram,
  })
  readRam(context: RouteRequestContext<{ connectionId: number }, { values: object } | null>): Promise<Response> {
    return this.execute(context.withParameters({ commandName: BitburnerCommands.ram.name }));
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
