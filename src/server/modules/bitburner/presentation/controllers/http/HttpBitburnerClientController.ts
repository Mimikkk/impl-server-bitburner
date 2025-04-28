import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { BitburnerClientService } from "@server/modules/bitburner/application/services/BitburnerClientService.ts";
import { BitburnerCommandService } from "@server/modules/bitburner/application/services/BitburnerCommandService.ts";
import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";
import { BitburnerCommands } from "@server/modules/bitburner/domain/BitburnerCommands.ts";
import { HttpBitburnerConnectionResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerConnectionResponse.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { RpcJsonResponse } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";

@ControllerNs.controller({ name: "HTTP Bitburner client", group: "client" })
export class HttpBitburnerClientController {
  static create(
    client: BitburnerClientService = BitburnerClientService.create(),
    connections: BitburnerConnectionService = BitburnerConnectionService.create(),
    commands: BitburnerCommandService = BitburnerCommandService.create(),
  ) {
    return new HttpBitburnerClientController(client, connections, commands);
  }

  private constructor(
    private readonly client: BitburnerClientService,
    private readonly connections: BitburnerConnectionService,
    private readonly commands: BitburnerCommandService,
  ) {}

  @RouteNs.post(`update-game-definition`)
  @OpenApiNs.route({
    description: "Update the server's game definition",
    summary: "Update the server's game definition",
    tags: [OpenApiTag.Serverwide],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpJsonResponse.Validation,
      HttpJsonResponse.Failure,
      HttpJsonResponse.Success,
    ],
  })
  async updateGameDefinition(): Promise<Response> {
    const connection = this.connections.any();
    if (connection === undefined) {
      return HttpBitburnerConnectionResponse.missingAny();
    }

    const request = BitburnerCommands.definition.request(undefined);
    if (ValidationError.is(request)) {
      return HttpJsonResponse.validation(request);
    }

    const response = await connection.value.promise(request.value);
    if (response === undefined || RpcJsonResponse.isError(response)) {
      return HttpJsonResponse.failure();
    }

    await this.client.updateTypeDefinitions(response);

    return HttpJsonResponse.success();
  }
}
