import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { StaticResourceUrl } from "@server/modules/static/infrastructure/StaticResourceUrl.ts";
import { HttpStaticFileResponse } from "../../infrastructure/messaging/responses/HttpStaticFileResponse.ts";
import { StaticService } from "../services/StaticService.ts";

@ControllerNs.controller({ name: "Static Assets", group: "static" })
export class HttpStaticController {
  static create(service: StaticService = StaticService.create()) {
    return new HttpStaticController(service);
  }

  private constructor(
    private readonly service: StaticService,
  ) {}

  @RouteNs.get("/favicon.ico")
  favicon() {
    return this.read(StaticResourceUrl.Favicon);
  }

  @RouteNs.get("{path:string}")
  file({ parameters: { values: { path } } }: RouteRequestContext<{ path: StaticResourceUrl }>) {
    path = path.replace(/:/g, "/") as StaticResourceUrl;
    return this.read(path);
  }

  private async read(url: StaticResourceUrl) {
    const file = await this.service.read(url);

    if (file === undefined) {
      return HttpStaticFileResponse.missing(url);
    }

    return HttpStaticFileResponse.found(file);
  }
}
