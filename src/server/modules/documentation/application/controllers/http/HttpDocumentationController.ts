import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { OpenApiGenerator } from "@server/infrastructure/openapi/OpenApiGenerator.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { DocumentationService } from "@server/modules/documentation/application/services/DocumentationService.ts";
import { DocumentationResourceUrl } from "@server/modules/documentation/infrastructure/DocumentationResourceUrl.ts";
import { HttpStaticFileResponse } from "@server/modules/static/infrastructure/messaging/responses/HttpStaticFileResponse.ts";

@ControllerNs.controller({ name: "Documentation", group: "docs" })
export class HttpDocumentationController {
  static create(
    openApi: OpenApiGenerator = OpenApiGenerator.create(),
    documentation: DocumentationService = DocumentationService.create(),
  ) {
    return new HttpDocumentationController(openApi, documentation);
  }

  private constructor(
    private readonly generator: OpenApiGenerator,
    private readonly service: DocumentationService,
  ) {}

  @RouteNs.get("")
  async index() {
    const path = DocumentationResourceUrl.Index;
    const file = await this.service.read(path);

    if (file === undefined) {
      return HttpStaticFileResponse.missing(path);
    }

    return HttpStaticFileResponse.found(file);
  }

  @RouteNs.get("openapi-spec.json")
  spec() {
    return HttpJsonResponse.success(this.generator.generate());
  }
}
