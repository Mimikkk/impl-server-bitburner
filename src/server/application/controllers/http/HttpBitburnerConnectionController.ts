import { BitburnerConnectionService } from "@server/application/services/BitburnerConnection.service.ts";
import { ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";

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
    const connections = Array.from(this.connections.list());

    return HttpJsonResponse.success({ connections });
  }

  show({ parameters: { values: { id } } }: RouteRequestContext<{ id: number }>): Response {
    const connection = this.connections.find(id);

    if (connection === undefined) {
      return HttpJsonResponse.missing({ id, message: "Connection not found" });
    }

    return HttpJsonResponse.success({ id, connection });
  }

  commands(): Response {
    const commands = Array.from(this.connections.list());

    return HttpJsonResponse.success({ commands });
  }
}
