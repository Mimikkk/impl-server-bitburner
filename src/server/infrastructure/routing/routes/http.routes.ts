import { HttpRouterBuilder } from "@server/infrastructure/routing/routers/protocols/http/HttpRouter.builder.ts";
import { HttpMethod } from "../../../../shared/enums/HttpMethod.ts";
import { HttpBitburnerCommandController } from "../../../modules/bitburner/application/controllers/http/HttpBitburnerCommandController.ts";
import { HttpBitburnerConnectionController } from "../../../modules/bitburner/application/controllers/http/HttpBitburnerConnectionController.ts";
import { HttpTemplateController } from "../../../modules/templates/application/controllers/http/HttpTemplateController.ts";

export const http = HttpRouterBuilder.create()
  .add({
    method: HttpMethod.Get,
    path: "/",
    Controller: HttpTemplateController,
    handler: "index",
  })
  .add({
    method: HttpMethod.Get,
    path: "/connections",
    Controller: HttpBitburnerConnectionController,
    handler: "index",
  })
  .add({
    method: HttpMethod.Get,
    path: "/connections/{connectionId:number}",
    Controller: HttpBitburnerConnectionController,
    handler: "show",
  })
  .add({
    method: HttpMethod.Get,
    path: "/commands",
    Controller: HttpBitburnerCommandController,
    handler: "index",
  })
  .add({
    method: HttpMethod.Get,
    path: "/commands/{name:string}",
    Controller: HttpBitburnerCommandController,
    handler: "show",
  })
  .build();
