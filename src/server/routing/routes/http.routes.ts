import { InstructionController } from "@server/controllers/http/InstructionController.ts";
import { HttpRouterBuilder } from "@server/routing/impl/routers/http/HttpRouter.builder.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { SocketConnectionController } from "@server/controllers/http/SocketConnectionController.ts";

export const http = HttpRouterBuilder.create()
  .add(HttpMethod.Get, "/", InstructionController, "index")
  .add(HttpMethod.Get, "/api/connections", SocketConnectionController, "index")
  .add(HttpMethod.Get, "/api/connections/{id}", SocketConnectionController, "show")
  .add(HttpMethod.Post, "/api/connections/{id}/commands/{command}", SocketConnectionController, "commands")
  .build();
