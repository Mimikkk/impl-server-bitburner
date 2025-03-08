import { InstructionController } from "@server/controllers/http/InstructionController.ts";
import { HttpRouterBuilder } from "@server/routing/router/http/HttpRouter.builder.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";

export const http = HttpRouterBuilder.create()
  .add(HttpMethod.Get, "/", InstructionController, "index")
  .build();
