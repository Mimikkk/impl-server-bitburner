import { HttpInstructionController } from "../../../application/controllers/http/HttpInstructionController.ts";
import { HttpRouterBuilder } from "../routers/protocols/http/HttpRouter.builder.ts";
import { HttpConnectionController } from "../../../application/controllers/http/HttpConnectionController.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";

export const http = HttpRouterBuilder.create()
  .add(HttpMethod.Get, "/", HttpInstructionController, "index")
  .add(HttpMethod.Get, "/connections", HttpConnectionController, "index")
  .add(HttpMethod.Get, "/connections/{id}", HttpConnectionController, "show")
  .add(HttpMethod.Post, "/connections/{id}/commands/{command}", HttpConnectionController, "commands")
  .build();
