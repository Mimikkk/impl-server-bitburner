import { WsConnectionController } from "@server/application/controllers/ws/WsConnectionController.ts";
import { WsRouterBuilder } from "@server/infrastructure/routing/routers/protocols/ws/WsRouter.builder.ts";

export const ws = WsRouterBuilder.create()
  .ws("/", WsConnectionController, "index")
  .build();
