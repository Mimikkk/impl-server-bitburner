import { HttpHtmlResponse } from "@server/infrastructure/messaging/responses/HttpHtmlResponse.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { ControllerRegistry } from "@server/infrastructure/routing/routers/ControllerRegistry.ts";
import { TemplateService } from "@server/modules/templates/application/services/TemplateService.ts";
import { TemplateUrl } from "@server/modules/templates/domain/constants/TemplateUrl.ts";
import { OpenApiBuilder } from "openapi3-ts/oas31";
export interface ControllerOptions {
  type: "http" | "ws";
}
function OpenApiController({ type }: ControllerOptions) {
  return function (target: any) {
    target.openapi = { type };
  };
}

function HttpRoute({ path }: { path: string }) {
  return function (target: any) {
    target.openapi = { path };
  };
}

@OpenApiController({ type: "http" })
export class HttpTemplateController {
  static create(templates: TemplateService = TemplateService.create()) {
    return new HttpTemplateController(templates);
  }

  private constructor(
    private readonly templates: TemplateService,
  ) {}

  @HttpRoute({ path: "/" })
  async index() {
    const template = await this.templates.read(TemplateUrl.Instruction);

    if (template === undefined) {
      return HttpJsonResponse.failure({ path: TemplateUrl.Instruction, message: "Template not found" });
    }

    return HttpHtmlResponse.success(template);
  }

  @HttpRoute({ path: "/docs" })
  async docs() {
    const template = await this.templates.read(TemplateUrl.OpenApi);

    if (template === undefined) {
      return HttpJsonResponse.failure({ path: TemplateUrl.OpenApi, message: "Template not found" });
    }

    return HttpHtmlResponse.success(template);
  }

  @HttpRoute({ path: "/docs/openapi-spec.json" })
  spec() {
    const builder = OpenApiBuilder.create({
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation for the Bitburner server",
      },
      servers: [
        {
          url: "http://localhost:8080",
          description: "Local development server",
        },
        {
          url: "http://127.0.0.1:8080",
          description: "Local development server (IP)",
        },
      ],
    });

    const http = ControllerRegistry.controllers.values().filter((c) => c.openapi?.type === "http");
    const ws = ControllerRegistry.controllers.values().filter((c) => c.openapi?.type === "ws");

    return HttpJsonResponse.success(builder.rootDoc);
  }
}
