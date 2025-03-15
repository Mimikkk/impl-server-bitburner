import { WsRouterBuilder } from "@server/infrastructure/routing/routers/protocols/ws/WsRouter.builder.ts";
import { WsBitburnerConnectionController } from "../../../application/controllers/ws/WsBitburnerConnectionController.ts";

export const ws = WsRouterBuilder.create()
  .ws("/", WsBitburnerConnectionController, "index")
  .build();
