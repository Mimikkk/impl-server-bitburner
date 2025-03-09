import { WsConnectionController } from "@server/controllers/ws/WsConnectionController.ts";
import { WsRouterBuilder } from "@server/routing/protocols/ws/WsRouter.builder.ts";

export const ws = WsRouterBuilder.create()
  .ws("/", WsConnectionController, "index")
  .build();
