import { ConnectionService } from "@server/application/services/Connection.service.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";

export class HttpConnectionController {
  static create(connections: ConnectionService = ConnectionService.create()) {
    return new HttpConnectionController(connections);
  }

  private constructor(
    private readonly connections: ConnectionService,
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
}
