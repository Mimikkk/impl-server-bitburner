import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { BitburnerMethod } from "../../../domain/commands/BitburnerCommandRegistry.ts";
import { BitburnerConnectionService } from "../../services/BitburnerConnectionService.ts";

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
      request: { original },
      parameters: { values: { connectionId, method } },
    }: RouteRequestContext<{ connectionId: number; method: BitburnerMethod }>,
  ): Promise<Response> {
    const connection = this.connections.find(connectionId);

    if (connection === undefined) {
      return HttpJsonResponse.missing({ connectionId, message: "Connection not found" });
    }

    const command = this.connections.findCommand(method);

    if (command === undefined) {
      return HttpJsonResponse.missing({ method, message: "Command not found" });
    }

    const body = await original.json();

    const errors = command.validator.validate(body);

    if (errors.length > 0) {
      return HttpJsonResponse.failure({ message: "Invalid command parameters", errors });
    }

    const commandRequest = command.request(body);

    connection.value.request(commandRequest.value);

    return HttpJsonResponse.success({ message: "Command queued" });
  }
}
