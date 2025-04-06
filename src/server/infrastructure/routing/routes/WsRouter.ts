import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import "@server/modules/bitburner/application/controllers/ws/WsBitburnerConnectionController.ts";
import { WsRouterBuilder } from "../routers/protocols/ws/WsRouterBuilder.ts";

const builder = WsRouterBuilder.create();

for (const Controller of ControllerNs.list) {
  const { group, routes } = ControllerNs.meta(Controller);

  for (const route of routes) {
    if (route.type !== "ws") continue;

    const path = route.path.startsWith("/") ? `${group}/${route.path}` : route.path;
    builder.ws({ path, Controller, handler: route.name });
  }
}

export const WsRouter = builder.build();
