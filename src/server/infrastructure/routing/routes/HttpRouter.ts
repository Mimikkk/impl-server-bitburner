import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import "@server/modules/bitburner/application/controllers/http/HttpBitburnerCommandController.ts";
import "@server/modules/bitburner/application/controllers/http/HttpBitburnerConnectionController.ts";
import "@server/modules/documentation/application/controllers/http/HttpDocumentationController.ts";
import "@server/modules/instruction/application/controllers/http/HttpInstructionController.ts";
import "@server/modules/static/application/controllers/http/HttpStaticController.ts";
import { HttpRouterBuilder } from "../routers/protocols/http/HttpRouterBuilder.ts";

const builder = HttpRouterBuilder.create();

for (const Controller of ControllerNs.list) {
  const { group, routes } = ControllerNs.meta(Controller);

  for (const route of routes) {
    if (route.type !== "http") continue;

    const path = route.path.startsWith("/") ? route.path : route.path ? `/${group}/${route.path}` : `/${group}`;

    builder.add({ Controller, method: route.method, path, handler: route.name });
  }
}

export const HttpRouter = builder.build();
