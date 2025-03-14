import { HttpConnectionController } from "@server/application/controllers/http/HttpConnectionController.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { HttpInstructionController } from "../../../application/controllers/http/HttpInstructionController.ts";
import { HttpRouterBuilder } from "../routers/protocols/http/HttpRouter.builder.ts";

export const http = HttpRouterBuilder.create()
  .add(HttpMethod.Get, "/", HttpInstructionController, "index")
  .add(HttpMethod.Get, "/connections", HttpConnectionController, "index")
  .build();
