import { ServerConfiguration } from "@server/infrastructure/configurations/ServerConfiguration.ts";
import { OpenApiControllerNs } from "@server/infrastructure/openapi/decorators/OpenApiControllerNs.ts";
import { OpenApiTag, OpenApiTags } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { OpenApiBuilder, OpenAPIObject } from "openapi3-ts/oas31";
import { ControllerStore } from "../routing/controllers/ControllerStore.ts";

export class OpenApiGenerator {
  static create(controllers: ControllerStore = ControllerStore.instance) {
    return new OpenApiGenerator(controllers);
  }

  private constructor(
    private readonly controllers: ControllerStore,
  ) {}

  generate(): OpenAPIObject {
    const builder = OpenApiBuilder.create({
      openapi: "3.1.1",
      info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation for the Bitburner server",
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT",
          identifier: "MIT",
        },
      },
      servers: [
        {
          url: `http://${ServerConfiguration.hostname}:${ServerConfiguration.port}`,
          description: "Local development server",
        },
      ],
      tags: OpenApiTags,
      paths: {
        "/": {
          get: {
            tags: [OpenApiTag.Template],
            summary: "Get the template",
            responses: {
              200: {
                description: "OK",
                content: { "text/html": { schema: { type: "string" } } },
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
          },
        },
      },
    });

    const controllers = Array
      .from(this.controllers.keys())
      .filter(OpenApiControllerNs.is) as unknown as OpenApiControllerNs.Controller[];

    const _http = controllers.filter((c) => c.openapi.type === "http");
    const _ws = controllers.filter((c) => c.openapi.type === "ws");

    return builder.getSpec();
  }
}
