import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { HttpJsonResponseCommon } from "@server/infrastructure/messaging/responses/HttpJsonResponseCommon.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiGenerator } from "@server/infrastructure/openapi/OpenApiGenerator.ts";
import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { DocumentationService } from "@server/modules/documentation/application/services/DocumentationService.ts";
import { DocumentationResourceUrl } from "@server/modules/documentation/infrastructure/DocumentationResourceUrl.ts";

@OpenApiNs.controller({ name: "Documentation", type: "http" })
export class HttpDocumentationController {
  static create(
    openApi: OpenApiGenerator = OpenApiGenerator.create(),
    documentation: DocumentationService = DocumentationService.create(),
  ) {
    return new HttpDocumentationController(openApi, documentation);
  }

  private constructor(
    private readonly openApi: OpenApiGenerator,
    private readonly documentation: DocumentationService,
  ) {}

  @RouteNs.get("/docs")
  async index() {
    const path = DocumentationResourceUrl.Index;
    const file = await this.documentation.read(path);

    if (file === undefined) {
      return HttpJsonResponseCommon.nofile({ path });
    }

    return new Response(file, { headers: { "Content-Type": "text/html" } });
  }

  @RouteNs.get("/docs/openapi-spec.json")
  spec() {
    return HttpJsonResponse.success(this.openApi.generate());
  }

  @RouteNs.get("/favicon.ico")
  favicon() {
    return HttpJsonResponse.unimplemented();
    // return HttpJsonResponse.success({ favicon: "🌐" });
  }

  @RouteNs.get("/static/swagger-ui/{path:string}")
  async swaggerUi({ parameters: { values: { path } } }: RouteRequestContext<{ path: string }>) {
    return HttpJsonResponse.unimplemented();
    // const file = await this.files.read(`node_modules/swagger-ui-dist/${path}`);

    // if (file === undefined) {
    //   return HttpJsonResponseCommon.nofile({ path });
    // }

    // const type = path.endsWith(".js")
    //   ? "application/javascript"
    //   : path.endsWith(".css")
    //   ? "text/css"
    //   : "application/octet-stream";

    // return new Response(file, { headers: { "Content-Type": type } });
  }
}
