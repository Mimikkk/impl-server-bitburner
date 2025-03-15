import { HttpBitburnerConnectionCommandController } from "@server/application/controllers/http/HttpBitburnerConnectionCommandController.ts";
import { HttpBitburnerConnectionController } from "@server/application/controllers/http/HttpBitburnerConnectionController.ts";
import { HttpTemplateController } from "@server/application/controllers/http/HttpTemplateController.ts";
import { HttpRouterBuilder } from "@server/infrastructure/routing/routers/protocols/http/HttpRouter.builder.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";

export const http = HttpRouterBuilder.create()
  .add(HttpMethod.Get, "/", HttpTemplateController, "index")
  .add(HttpMethod.Get, "/connections", HttpBitburnerConnectionController, "index")
  .add(HttpMethod.Get, "/connections/{connectionId:number}", HttpBitburnerConnectionController, "show")
  .add(HttpMethod.Get, "/connections/{connectionId:number}/commands", HttpBitburnerConnectionCommandController, "index")
  .add(
    HttpMethod.Get,
    "/connections/{connectionId:number}/commands/{command:string}",
    HttpBitburnerConnectionCommandController,
    "show",
  )
  .add(
    HttpMethod.Post,
    "/connections/{connectionId:number}/commands",
    HttpBitburnerConnectionCommandController,
    "queue",
  )
  .build();
