import { HttpInstructionController } from "@server/modules/instruction/application/controllers/http/HttpInstructionController.ts";
import { HttpMethod } from "../../../../shared/enums/HttpMethod.ts";
import { HttpBitburnerCommandController } from "../../../modules/bitburner/application/controllers/http/HttpBitburnerCommandController.ts";
import { HttpBitburnerConnectionController } from "../../../modules/bitburner/application/controllers/http/HttpBitburnerConnectionController.ts";
import { HttpDocumentationController } from "../../../modules/documentation/application/controllers/http/HttpDocumentationController.ts";
import { HttpRouterBuilder } from "../routers/protocols/http/HttpRouterBuilder.ts";

export const HttpRoutes = HttpRouterBuilder.create()
  .add({
    method: HttpMethod.Get,
    path: "/",
    Controller: HttpInstructionController,
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
  .add({
    method: HttpMethod.Get,
    path: "/docs",
    Controller: HttpDocumentationController,
    handler: "index",
  })
  .add({
    method: HttpMethod.Get,
    path: "/docs/openapi-spec.json",
    Controller: HttpDocumentationController,
    handler: "spec",
  })
  .add({
    method: HttpMethod.Get,
    path: "/favicon.ico",
    Controller: HttpDocumentationController,
    handler: "favicon",
  })
  .add({
    method: HttpMethod.Get,
    path: "/static/swagger-ui/{path:string}",
    Controller: HttpDocumentationController,
    handler: "swaggerUi",
  })
  .build();
