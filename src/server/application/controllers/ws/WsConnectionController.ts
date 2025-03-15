import { ConnectionService } from "@server/application/services/Connection.service.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";

export class WsConnectionController {
  static create(connections: ConnectionService = ConnectionService.create()) {
    return new WsConnectionController(connections);
  }

  private constructor(
    private readonly connections: ConnectionService,
  ) {}

  index({ request: { request } }: RouteRequestContext): Response {
    const { socket, response } = Deno.upgradeWebSocket(request);

    this.connections.attach(socket);

    return response;
  }
}
