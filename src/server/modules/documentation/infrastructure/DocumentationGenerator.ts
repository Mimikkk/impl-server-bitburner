import { OpenApiResponseNs } from "@server/infrastructure/openapi/decorators/OpenApiResponseNs.ts";
import { OpenApiRouteNs } from "@server/infrastructure/openapi/decorators/OpenApiRouteNs.ts";
import { OpenApiTag, OpenApiTags } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { OpenApiBuilder, OpenAPIObject, ResponseObject } from "openapi3-ts/oas31";
import { ControllerStore } from "../../../infrastructure/routing/controllers/ControllerStore.ts";

export class DocumentationGenerator {
  static readonly initial: OpenAPIObject = {
    info: {
      title: "Bitburner API Documentation",
      version: "1.0.0",
      description: "API documentation for the Bitburner server",
    },
    openapi: "3.1.1",
  };
  static create(controllers: ControllerStore = ControllerStore.instance) {
    return new DocumentationGenerator(controllers);
  }

  private constructor(
    private readonly controllers: ControllerStore,
  ) {}

  generate(): OpenAPIObject {
    const builder = OpenApiBuilder.create(structuredClone(DocumentationGenerator.initial));

    const controllers = Array.from(this.controllers.keys()).filter(ControllerNs.is) as unknown as ControllerNs.Meta[];

    const usedTags: OpenApiTag[] = [];
    for (const controller of controllers) {
      const meta = ControllerNs.meta(controller);

      for (const route of meta.routes) {
        if (route.type === "ws") continue;

        const openapi = OpenApiRouteNs.get(route.self);
        if (openapi === undefined) continue;

        for (const tag of openapi.tags) {
          if (usedTags.includes(tag)) continue;
          usedTags.push(tag);
        }

        const responses = Object.fromEntries(
          openapi.responses
            .map(OpenApiResponseNs.meta)
            .map((r) => [r.status, {
              description: r.description,
              content: r.content,
            } as ResponseObject]),
        );

        builder.addPath(route.path, {
          [route.method.toLowerCase() as "get"]: {
            tags: openapi.tags,
            summary: openapi.summary,
            deprecated: openapi.deprecated,
            description: openapi.description,
            responses,
          },
        });
      }
    }

    this.addTags(builder, usedTags);

    return builder.getSpec();
  }

  private addTags(builder: OpenApiBuilder, tags: OpenApiTag[]): OpenApiBuilder {
    for (const tag of tags) {
      const object = OpenApiTags.get(tag);
      if (object === undefined) continue;

      builder.addTag(object);
    }

    return builder;
  }
}
