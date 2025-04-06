import { HttpJsonResponseNs } from "@server/infrastructure/messaging/responses/HttpJsonResponseNs.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { DocumentationService } from "@server/modules/documentation/application/services/DocumentationService.ts";
import { DocumentationResourceUrl } from "@server/modules/documentation/infrastructure/DocumentationResourceUrl.ts";
import { HttpStaticFileResponse } from "@server/modules/static/infrastructure/messaging/responses/HttpStaticFileResponse.ts";
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
    const url = DocumentationResourceUrl.Index;
    const file = await this.service.read(url);

    if (file === undefined) {
      return HttpStaticFileResponse.missing(url);
    }

    return HttpStaticFileResponse.found(file);
  }

  @RouteNs.get("openapi-spec.json")
  spec() {
    return HttpJsonResponseNs.success(this.generator.generate());
  }
}
