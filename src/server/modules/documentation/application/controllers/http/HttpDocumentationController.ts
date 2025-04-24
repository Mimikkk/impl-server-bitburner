import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/http/HttpJsonResponse.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { DocumentationService } from "@server/modules/documentation/application/services/DocumentationService.ts";
import { DocumentationResourceUrl } from "@server/modules/documentation/infrastructure/DocumentationResourceUrl.ts";
import { HttpStaticFileResponse } from "@server/modules/static/application/http/messaging/responses/HttpStaticFileResponse.ts";
import { DocumentationGenerator } from "../../../infrastructure/DocumentationGenerator.ts";

@ControllerNs.controller({ name: "Documentation", group: "docs" })
export class HttpDocumentationController {
  static create(
    openApi: DocumentationGenerator = DocumentationGenerator.create(),
    documentation: DocumentationService = DocumentationService.create(),
  ) {
    return new HttpDocumentationController(openApi, documentation);
  }

  private constructor(
    private readonly generator: DocumentationGenerator,
    private readonly service: DocumentationService,
  ) {}

  @RouteNs.get("")
  async index() {
    const path = DocumentationResourceUrl.Index;
    const file = await this.service.read(path);

    if (file === undefined) {
      return HttpStaticFileResponse.missing({ path });
    }

    return HttpStaticFileResponse.content(file);
  }

  @RouteNs.get("openapi-spec.json")
  spec() {
    return content(this.generator.generate());
  }
}

export const [Content, content] = HttpJsonResponse.content({
  example: DocumentationGenerator.initial,
  description: "The OpenAPI specification",
  name: "OpenAPI Specification",
});
