import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { DocumentationService } from "@server/modules/documentation/application/services/DocumentationService.ts";
import { HttpStaticFileResponse } from "@server/modules/static/presentation/messaging/http/responses/HttpStaticFileResponse.ts";
import { HttpHtmlResponse } from "@server/presentation/messaging/http/responses/HttpHtmlResponse.ts";
import { DocumentationAssetUrl } from "../../../infrastructure/DocumentationAssetUrl.ts";
import { DocumentationGenerator } from "../../../infrastructure/DocumentationGenerator.ts";
import { HttpDocumentationResponse } from "../../messaging/http/HttpDocumentationResponse.ts";

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
  @OpenApiNs.route({
    summary: "Get the documentation index HTML",
    description: "Get the documentation as HTML.",
    tags: [OpenApiTag.Documentation],
    responses: [HttpStaticFileResponse.Missing, HttpHtmlResponse.Content],
  })
  async index() {
    const path = DocumentationAssetUrl.Index;
    const file = await this.service.read(path);

    if (file === undefined) {
      return HttpStaticFileResponse.missing({ path });
    }

    return HttpHtmlResponse.content(file.content);
  }

  @RouteNs.get("openapi-spec.json")
  @OpenApiNs.route({
    summary: "Get the OpenAPI specification JSON",
    description: "Get the OpenAPI specification as JSON.",
    tags: [OpenApiTag.Documentation],
    responses: [HttpDocumentationResponse.Content],
  })
  spec() {
    return HttpDocumentationResponse.content(this.generator.generate());
  }
}
