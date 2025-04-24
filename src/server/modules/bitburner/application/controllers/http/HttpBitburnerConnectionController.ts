import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { HttpBitburnerConnectionResponse } from "../../messaging/responses/HttpBitburnerConnectionResponse.ts";
import { BitburnerConnectionService } from "../../services/BitburnerConnectionService.ts";

export class HttpBitburnerConnectionController {
  static create(
    connections: BitburnerConnectionService = BitburnerConnectionService.create(ConnectionRepository.instance),
  ) {
    return new HttpBitburnerConnectionController(connections);
  }

  private constructor(
    private readonly connections: BitburnerConnectionService,
  ) {}

  index(): Response {
    const connections = Array.from(this.connections.all());

    return HttpBitburnerConnectionResponse.multiple(connections);
  }

  show({ parameters: { values: { connectionId } } }: RouteRequestContext<{ connectionId: number }>): Response {
    const connection = this.connections.find(connectionId);

    if (connection === undefined) {
      return HttpBitburnerConnectionResponse.missing(connectionId);
    }

    return HttpBitburnerConnectionResponse.single(connection);
  }
}
