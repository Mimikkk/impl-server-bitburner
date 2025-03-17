import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ConnectionResource } from "@server/modules/bitburner/application/resources/ConnectionResource.ts";
import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { BitburnerConnectionService } from "../../services/BitburnerConnectionService.ts";

export class HttpBitburnerConnectionController {
  static create(
    connections: BitburnerConnectionService = BitburnerConnectionService.create(ConnectionRepository.instance),
  ) {
    return new HttpBitburnerConnectionController(connections);
  }

  private constructor(
    private readonly connections: BitburnerConnectionService,
  ) {}

  index(): Response {
    const connections = Array.from(this.connections.all());

    return HttpJsonResponse.success({ connections: ConnectionResource.fromConnections(connections) });
  }

  show({ parameters: { values: { connectionId } } }: RouteRequestContext<{ connectionId: number }>): Response {
    const connection = this.connections.find(connectionId);

    if (connection === undefined) {
      return HttpJsonResponse.missing({ connectionId, message: "Connection not found" });
    }

    return HttpJsonResponse.success({ connection: ConnectionResource.fromConnection(connection) });
  }
}
