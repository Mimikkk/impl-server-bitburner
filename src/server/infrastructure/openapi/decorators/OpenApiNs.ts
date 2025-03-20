import { OpenApiControllerNs } from "@server/infrastructure/openapi/decorators/OpenApiControllerNs.ts";
import { OpenApiResponseNs } from "@server/infrastructure/openapi/decorators/OpenApiResponseNs.ts";
import { OpenApiRouteNs } from "@server/infrastructure/openapi/decorators/OpenApiRouteNs.ts";

export namespace OpenApiNs {
  export const controller = OpenApiControllerNs.decorate;
  export const response = OpenApiResponseNs.decorate;
  export const route = OpenApiRouteNs.decorate;
}
