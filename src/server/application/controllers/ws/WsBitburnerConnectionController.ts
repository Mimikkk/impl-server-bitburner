import { BitburnerConnectionService } from "@server/application/services/BitburnerConnection.service.ts";
import { ConnectionRepository } from "@server/domain/modules/connections/ConnectionRepository.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";

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
