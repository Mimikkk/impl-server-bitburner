import { ServerConfiguration } from "@server/infrastructure/configurations/ServerConfiguration.ts";
import { OpenApiTags } from "@server/infrastructure/openapi/OpenApiTag.ts";
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
        title: "Bitburner API Documentation",
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
      // components: {
      //   links: {},
      //   responses: {
      //     "200": {
      //       description: "OK",
      //       content: {
      //         "text/html": { schema: { type: "string" } },
      //       },
      //     },
      //   },
      // },
    });

    // const controllers = Array
    //   .from(this.controllers.keys())
    //   .filter(OpenApiControllerNs.is) as unknown as OpenApiControllerNs.Controller[];

    // const http = controllers.filter((c) => c.openapi.type === "http");

    // for (const { prototype } of http) {
    //   const names = Object.getOwnPropertyNames(prototype);
    //   const methods = names.map((m) => prototype[m]);
    //   const routes = methods.filter((m) => OpenApiRouteNs.is(m) && RouteNs.is(m));

    //   for (const { openapi, route } of routes) {
    //     builder.addPath(route.path, {
    //       [route.method.toLowerCase() as "get"]: {
    //         tags: openapi.tags,
    //         summary: openapi.summary,
    //         deprecated: openapi.deprecated,
    //         description: openapi.description,
    //         responses: {
    //           200: {
    //             description: "OK",
    //             content: { "text/html": { schema: { type: "string" } } },
    //             headers: {
    //               "Content-Type": {
    //                 description: "The MIME type of the body of the response",
    //                 example: "text/html",
    //                 schema: { type: "string", example: "text/html" },
    //               },
    //             },
    //           } satisfies ResponseObject,
    //         },
    //       },
    //     });
    //   }
    // }

    // const _ws = controllers.filter((c) => c.openapi.type === "ws");

    console.log("ABC");

    return builder.getSpec();
  }
}
