import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
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
  @OpenApiNs.route({
    summary: "Connect to the bitburner server",
    description: "Connect to the bitburner server via websocket.",
    tags: [OpenApiTag.Connections],
    responses: [],
  })
  index({ request: { original } }: RouteRequestContext): Response {
    const { socket, response } = Deno.upgradeWebSocket(original);

    this.connections.attach(socket);

    return response;
  }
}
