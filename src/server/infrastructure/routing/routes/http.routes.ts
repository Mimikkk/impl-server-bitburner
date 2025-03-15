import { HttpConnectionController } from "@server/application/controllers/http/HttpConnectionController.ts";
import { HttpRouterBuilder } from "@server/infrastructure/routing/routers/protocols/http/HttpRouter.builder.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { HttpTemplateController } from "../../../application/controllers/http/HttpTemplateController.ts";

export const http = HttpRouterBuilder.create()
  .add(HttpMethod.Get, "/", HttpTemplateController, "index")
  .add(HttpMethod.Get, "/connections", HttpConnectionController, "index")
  .add(HttpMethod.Get, "/connections/{id:number}", HttpConnectionController, "show")
  .build();
