import { HttpHtmlResponse } from "@server/infrastructure/messaging/responses/HttpHtmlResponse.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiGenerator } from "@server/infrastructure/openapi/OpenApiGenerator.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { TemplateService } from "@server/modules/templates/application/services/TemplateService.ts";
import { TemplateUrl } from "@server/modules/templates/domain/constants/TemplateUrl.ts";

@OpenApiNs.controller({ name: "Templates", type: "http" })
export class HttpTemplateController {
  static create(
    templates: TemplateService = TemplateService.create(),
    openApi: OpenApiGenerator = OpenApiGenerator.create(),
  ) {
    return new HttpTemplateController(templates, openApi);
  }

  private constructor(
    private readonly templates: TemplateService,
    private readonly openApi: OpenApiGenerator,
  ) {}

  @RouteNs.get("/")
  @OpenApiNs.route({
    summary: "Get the template",
    description: "Get the template",
    tags: [OpenApiTag.Template],
    responses: {
      200: { description: "OK", content: { "text/html": { schema: { type: "string" } } } },
      404: {
        description: "Not Found",
        content: {
          "application/json": {
            schema: { type: "object", properties: { path: { type: "string" }, message: { type: "string" } } },
          },
        },
      },
    },
  })
  async index() {
    const template = await this.templates.read(TemplateUrl.Instruction);

    if (template === undefined) {
      return HttpJsonResponse.failure({ path: TemplateUrl.Instruction, message: "Template not found" });
    }

    return HttpHtmlResponse.success(template);
  }

  @RouteNs.get("/docs")
  @OpenApiNs.route({
    summary: "Get the docs",
    description: "Get the docs",
    tags: [OpenApiTag.Template],
    responses: {
      200: { description: "OK", content: { "text/html": { schema: { type: "string" } } } },
      404: {
        description: "Not Found",
        content: {
          "application/json": {
            schema: { type: "object", properties: { path: { type: "string" }, message: { type: "string" } } },
          },
        },
      },
    },
  })
  async docs() {
    const template = await this.templates.read(TemplateUrl.OpenApi);

    if (template === undefined) {
      return HttpJsonResponse.failure({ path: TemplateUrl.OpenApi, message: "Template not found" });
    }

    return HttpHtmlResponse.success(template);
  }

  @RouteNs.get("/docs/openapi-spec.json")
  @OpenApiNs.route({
    summary: "Get the openapi spec",
    description: "Get the openapi spec",
    tags: [OpenApiTag.Template],
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: { type: "object", properties: { path: { type: "string" }, message: { type: "string" } } },
          },
        },
      },
      404: {
        description: "Not Found",
        content: {
          "application/json": {
            schema: { type: "object", properties: { path: { type: "string" }, message: { type: "string" } } },
          },
        },
      },
    },
  })
  spec() {
    return HttpJsonResponse.success(this.openApi.generate());
  }
}
