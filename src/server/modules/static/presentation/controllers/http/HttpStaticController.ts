import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { StaticService } from "@server/modules/static/application/services/StaticService.ts";
import { HttpStaticFileResponse } from "@server/modules/static/presentation/messaging/http/responses/HttpStaticFileResponse.ts";
import { StaticAssetUrl } from "../../../domain/StaticAssetUrl.ts";
import { HttpStaticParameter } from "../../messaging/http/parameters/HttpStaticParameter.ts";

@ControllerNs.controller({ name: "Static Assets", group: "static" })
export class HttpStaticController {
  static create(service: StaticService = StaticService.create()) {
    return new HttpStaticController(service);
  }

  private constructor(
    private readonly service: StaticService,
  ) {}

  @RouteNs.get(HttpStaticParameter.Path)
  @OpenApiNs.route({
    summary: "Get a static file",
    description: "Get a static file",
    tags: [OpenApiTag.Static],
    responses: [HttpStaticFileResponse.Missing],
    parameters: [HttpStaticParameter.Path],
  })
  file({ parameters: { values: { path } } }: RouteRequestContext<{ path: StaticAssetUrl }>) {
    path = decodeURIComponent(path).replace(/:/g, "/") as StaticAssetUrl;
    return this.read(path);
  }

  private async read(path: StaticAssetUrl) {
    const file = await this.service.read(path);

    if (file === undefined) {
      return HttpStaticFileResponse.missing({ path });
    }

    return HttpStaticFileResponse.content(file);
  }
}
