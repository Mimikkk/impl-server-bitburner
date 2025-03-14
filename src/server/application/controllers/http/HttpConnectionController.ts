import { ConnectionService } from "@server/application/services/Connection.service.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";

export class HttpConnectionController {
  static create(connections: ConnectionService = ConnectionService.create()) {
    return new HttpConnectionController(connections);
  }

  private constructor(
    private readonly connections: ConnectionService,
  ) {}

  public index(): Response {
    const items = Array.from(this.connections.list());

    return HttpJsonResponse.success({ connections: items });
  }
}
