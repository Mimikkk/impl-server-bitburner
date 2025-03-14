import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { ConnectionService } from "@server/application/services/Connection.service.ts";

export class HttpConnectionController {
  static create(
    connections: ConnectionService = ConnectionService.create(),
  ) {
    return new HttpConnectionController(connections);
  }

  private constructor(
    private readonly connections: ConnectionService,
  ) {}

  public index() {
    const connections = this.connections.list();

    return HttpJsonResponse.success({
      connections: connections.map((connection) => ({
        id: connection.id,
      })),
    });
  }
  public show(request: Request) {
    console.log("set command");
    return HttpJsonResponse.unimplemented();
  }

  public commands(request: Request) {
    console.log("set command");
    return HttpJsonResponse.unimplemented();
  }
}
