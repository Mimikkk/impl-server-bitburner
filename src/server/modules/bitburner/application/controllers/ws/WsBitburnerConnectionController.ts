import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { BitburnerConnectionService } from "../../services/BitburnerConnectionService.ts";

export class WsBitburnerConnectionController {
  static create(
    connections: BitburnerConnectionService = BitburnerConnectionService.create(
      ConnectionRepository.instance,
    ),
  ) {
    return new WsBitburnerConnectionController(connections);
  }

  private constructor(
    private readonly connections: BitburnerConnectionService,
  ) {}

  index({ request: { original } }: RouteRequestContext): Response {
    const { socket, response } = Deno.upgradeWebSocket(original);

    this.connections.attach(socket);

    return response;
  }
}
