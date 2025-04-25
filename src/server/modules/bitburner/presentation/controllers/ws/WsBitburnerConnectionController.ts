import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";

@ControllerNs.controller({ name: "WS Bitburner connection" })
export class WsBitburnerConnectionController {
  static create(
    connections: BitburnerConnectionService = BitburnerConnectionService.create(),
  ) {
    return new WsBitburnerConnectionController(connections);
  }

  private constructor(
    private readonly connections: BitburnerConnectionService,
  ) {}

  @RouteNs.ws("/")
  index({ request: { original } }: RouteRequestContext): Response {
    const { socket, response } = Deno.upgradeWebSocket(original);

    this.connections.attach(socket);

    return response;
  }
}
