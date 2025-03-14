import { WsConnectionController } from "../../../application/controllers/ws/WsConnectionController.ts";
import { WsRouterBuilder } from "../routers/protocols/ws/WsRouter.builder.ts";

export const ws = WsRouterBuilder.create()
  .ws("/", WsConnectionController, "index")
  .build();
