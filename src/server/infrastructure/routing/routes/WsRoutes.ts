import { WsBitburnerConnectionController } from "../../../modules/bitburner/application/controllers/ws/WsBitburnerConnectionController.ts";
import { WsRouterBuilder } from "../routers/protocols/ws/WsRouterBuilder.ts";

export const WsRoutes = WsRouterBuilder.create()
  .ws({
    path: "/",
    Controller: WsBitburnerConnectionController,
    handler: "index",
  })
  .build();
