import { InstructionController } from "@server/controllers/http/InstructionController.ts";
import { HttpRouterBuilder } from "@server/routing/impl/routers/http/HttpRouter.builder.ts";
import { SocketConnectionController } from "@server/controllers/http/SocketConnectionController.ts";

export const http = HttpRouterBuilder.create()
  .get("/", InstructionController, "index")
  .get("/api/connections", SocketConnectionController, "index")
  .get("/api/connections/{id}", SocketConnectionController, "show")
  .post("/api/connections/{id}/commands/{command}", SocketConnectionController, "commands")
  .build();
