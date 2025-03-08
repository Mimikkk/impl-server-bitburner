import { WebsocketController } from "@server/controllers/ws/WebsocketController.ts";
import { WsRouterBuilder } from "@server/routing/router/ws/WsRouter.builder.ts";

export const ws = WsRouterBuilder.create()
  .ws("/", WebsocketController, "index")
  .build();
