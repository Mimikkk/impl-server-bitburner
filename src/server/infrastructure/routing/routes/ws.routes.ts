import { WsRouterBuilder } from "@server/infrastructure/routing/routers/protocols/ws/WsRouter.builder.ts";
import { WsBitburnerConnectionController } from "../../../modules/bitburner/application/controllers/ws/WsBitburnerConnectionController.ts";

export const ws = WsRouterBuilder.create()
  .ws({
    path: "/",
    Controller: WsBitburnerConnectionController,
    handler: "index",
  })
  .build();
