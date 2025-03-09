import { WebsocketController } from "@server/controllers/ws/WebsocketController.ts";
import { WsRouterBuilder } from "@server/routing/impl/routers/ws/WsRouter.builder.ts";

export const ws = WsRouterBuilder.create()
  .ws("/", WebsocketController, "index")
  .build();
