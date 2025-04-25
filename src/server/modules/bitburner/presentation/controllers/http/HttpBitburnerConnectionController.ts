import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";
import { HttpBitburnerConnectionResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerConnectionResponse.ts";
import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";

@ControllerNs.controller({ name: "HTTP Bitburner connection", group: "connections" })
export class HttpBitburnerConnectionController {
  static create(
    connections: BitburnerConnectionService = BitburnerConnectionService.create(ConnectionRepository.instance),
  ) {
    return new HttpBitburnerConnectionController(connections);
  }

  private constructor(
    private readonly connections: BitburnerConnectionService,
  ) {}

  @RouteNs.get("")
  @OpenApiNs.route({
    description: "Get all connections",
    summary: "Get all connections",
    tags: [OpenApiTag.Connections],
    responses: [HttpBitburnerConnectionResponse.Multiple],
  })
  index(): Response {
    const connections = Array.from(this.connections.all());

    return HttpBitburnerConnectionResponse.multiple(connections);
  }

  @RouteNs.get("{connectionId:number}")
  @OpenApiNs.route({
    description: "Get a connection by id",
    summary: "Get a connection by id",
    tags: [OpenApiTag.Connections],
    responses: [HttpBitburnerConnectionResponse.Single, HttpBitburnerConnectionResponse.Missing],
  })
  show({ parameters: { values: { connectionId } } }: RouteRequestContext<{ connectionId: number }>): Response {
    const connection = this.connections.find(connectionId);

    if (connection === undefined) {
      return HttpBitburnerConnectionResponse.missing(connectionId);
    }

    return HttpBitburnerConnectionResponse.single(connection);
  }
}
