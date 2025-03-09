import { HttpJsonResponse } from "@server/messages/responses/HttpJsonResponse.ts";
import { ConnectionService } from "../../services/connections/ConnectionService.ts";

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
    return HttpJsonResponse.success({
      sockets: Array.from(this.connections.managers.entries()).map(([socket]) => ({
        readyState: socket.readyState,
        protocol: socket.protocol,
        extensions: socket.extensions,
        bufferedAmount: socket.bufferedAmount,
        url: socket.url,
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
