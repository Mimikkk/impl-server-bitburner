import { BitburnerConnectionService } from "@server/application/services/BitburnerConnection.service.ts";
import { ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { BitburnerMethod } from "../../../domain/modules/bitburner/commands/BitburnerCommandRegistry.ts";

export class HttpBitburnerConnectionCommandController {
  static create(
    connections: BitburnerConnectionService = BitburnerConnectionService.create(ConnectionRepository.instance),
  ) {
    return new HttpBitburnerConnectionCommandController(connections);
  }

  private constructor(
    private readonly connections: BitburnerConnectionService,
  ) {}

  index(): Response {
    const commands = Array.from(this.connections.listCommands());

    return HttpJsonResponse.success({ commands });
  }

  show({ parameters: { values: { method } } }: RouteRequestContext<{ method: BitburnerMethod }>): Response {
    const command = this.connections.findCommand(method);

    if (command === undefined) {
      return HttpJsonResponse.missing({ method, message: "Command not found" });
    }

    return HttpJsonResponse.success({ command });
  }

  async queue(
    {
      request: request,
      parameters: { values: { connectionId, method } },
    }: RouteRequestContext<
      { connectionId: number; method: BitburnerMethod }
    >,
  ): Promise<Response> {
    const connection = this.connections.find(connectionId);

    if (connection === undefined) {
      return HttpJsonResponse.missing({ connectionId, message: "Connection not found" });
    }

    const command = this.connections.findCommand(method);

    if (command === undefined) {
      return HttpJsonResponse.missing({ method, message: "Command not found" });
    }

    const body = await request.request.json();

    const commandRequest = command.request(body);

    connection.value.request(commandRequest.value);

    return HttpJsonResponse.success({ message: "Command queued" });
  }
}
