import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { BitburnerClientService } from "@server/modules/bitburner/application/services/BitburnerClientService.ts";
import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";
import { BitburnerCommands } from "@server/modules/bitburner/domain/BitburnerCommands.ts";
import { HttpBitburnerConnectionResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerConnectionResponse.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { RpcJsonResponse } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";

@ControllerNs.controller({ name: "HTTP Bitburner client", group: "client" })
export class HttpBitburnerClientController {
  static create() {
    return new HttpBitburnerClientController();
  }

  private constructor(
    private readonly client = BitburnerClientService.create(),
    private readonly connections = BitburnerConnectionService.create(),
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

  @RouteNs.post("sync-server")
  @OpenApiNs.route({
    description: "Sync the server's game files. Will overwrite existing files.",
    summary: "Sync the server's game files",
    tags: [OpenApiTag.Serverwide],
  })
  async syncServer() {
    const response = await this.client.syncServer();
    if (response === "no-connection-available") {
      return HttpBitburnerConnectionResponse.missingAny();
    }

    return HttpJsonResponse.success();
  }

  @RouteNs.post("sync-client")
  @OpenApiNs.route({
    description: "Sync the client's game files. Will overwrite existing files.",
    summary: "Sync the client's game files",
    tags: [OpenApiTag.Serverwide],
  })
  async syncClient() {
    const response = await this.client.syncClient();
    if (response === "no-connection-available") {
      return HttpBitburnerConnectionResponse.missingAny();
    }

    return HttpJsonResponse.success();
  }
}
