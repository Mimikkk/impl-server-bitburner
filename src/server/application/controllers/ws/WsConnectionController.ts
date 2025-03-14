import { ConnectionService } from "@server/application/services/Connection.service.ts";

export class WsConnectionController {
  static create(
    connections: ConnectionService = ConnectionService.create(),
  ) {
    return new WsConnectionController(connections);
  }

  private constructor(
    private readonly connections: ConnectionService,
  ) {}

  public index(request: Request) {
    const { socket, response } = Deno.upgradeWebSocket(request);

    this.connections.manage(socket);

    return response;
  }
}
