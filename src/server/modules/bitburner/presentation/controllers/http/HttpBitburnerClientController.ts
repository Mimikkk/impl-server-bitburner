import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { BitburnerClientService } from "@server/modules/bitburner/application/services/BitburnerClientService.ts";
import { HttpBitburnerConnectionResponse } from "@server/modules/bitburner/presentation/messaging/http/responses/HttpBitburnerConnectionResponse.ts";
import { ConnectionError } from "@server/modules/connections/domain/errors/ConnectionError.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { BitburnerClientError } from "../../../domain/errors/BitburnerClientError.ts";

@ControllerNs.controller({ name: "HTTP Bitburner client", group: "client" })
export class HttpBitburnerClientController {
  static create() {
    return new HttpBitburnerClientController();
  }

  private constructor(
    private readonly client = BitburnerClientService.create(),
  ) {}

  @RouteNs.post(`update-game-definition`)
  @OpenApiNs.route({
    description: "Update the server's game definition",
    summary: "Update the server's game definition",
    tags: [OpenApiTag.Serverwide],
    responses: [
      HttpBitburnerConnectionResponse.Missing,
      HttpJsonResponse.Failure,
      HttpJsonResponse.Success,
    ],
  })
  async updateGameDefinition(): Promise<Response> {
    const result = await this.client.updateServerDefinition();

    if (result === ConnectionError.NoAvailable) {
      return HttpBitburnerConnectionResponse.missingAny();
    }

    if (result === BitburnerClientError.DefinitionFailed) {
      return HttpJsonResponse.failure();
    }

    return HttpJsonResponse.success();
  }

  @RouteNs.post("sync-server")
  @OpenApiNs.route({
    summary: "Sync the server's game files",
    description:
      "<b>Will overwrite existing SERVER files.</b> Sync the server's game files based on the client's game files.",
    responses: [
      HttpBitburnerConnectionResponse.MissingAny,
      HttpJsonResponse.Failure,
      HttpJsonResponse.Success,
    ],
    tags: [OpenApiTag.Serverwide],
  })
  async syncServer() {
    const result = await this.client.syncServer();

    if (result === ConnectionError.NoAvailable) {
      return HttpBitburnerConnectionResponse.missingAny();
    }

    if (result === BitburnerClientError.ListFailed) {
      return HttpJsonResponse.failure();
    }

    return HttpJsonResponse.success();
  }

  @RouteNs.post("sync-client")
  @OpenApiNs.route({
    summary: "Sync the client's game files",
    description:
      "<b>Will overwrite existing CLIENT files.</b> Sync the client's game files based on the server's game files.",
    responses: [
      HttpBitburnerConnectionResponse.MissingAny,
      HttpJsonResponse.Failure,
      HttpJsonResponse.Success,
    ],
    tags: [OpenApiTag.Serverwide],
  })
  async syncClient() {
    const result = await this.client.syncClient();

    if (result === ConnectionError.NoAvailable) {
      return HttpBitburnerConnectionResponse.missingAny();
    }

    if (result === BitburnerClientError.ListFailed) {
      return HttpJsonResponse.failure();
    }

    if (result === BitburnerClientError.UpdateFailed) {
      return HttpJsonResponse.failure();
    }

    if (result === BitburnerClientError.RemoveFailed) {
      return HttpJsonResponse.failure();
    }

    return HttpJsonResponse.success();
  }
}
