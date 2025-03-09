import { WebsocketController } from "@server/controllers/ws/WebsocketController.ts";
import { WsRouterBuilder } from "../routers/ws/WsRouter.builder.ts";

export const ws = WsRouterBuilder.create()
  .ws("/", WebsocketController, "index")
  .build();
