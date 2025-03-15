import { HttpConnectionController } from "@server/application/controllers/http/HttpConnectionController.ts";
import { HttpInstructionController } from "@server/application/controllers/http/HttpInstructionController.ts";
import { HttpRouterBuilder } from "@server/infrastructure/routing/routers/protocols/http/HttpRouter.builder.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";

export const http = HttpRouterBuilder.create()
  .add(HttpMethod.Get, "/", HttpInstructionController, "index")
  .add(HttpMethod.Get, "/connections", HttpConnectionController, "index")
  .add(HttpMethod.Get, "/connections/{id:number}", HttpConnectionController, "show")
  .build();
