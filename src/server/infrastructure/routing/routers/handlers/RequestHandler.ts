import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { Awaitable } from "@shared/types/common.ts";

export interface RequestHandler {
  handle(context: RouteRequestContext): Awaitable<Response>;
}
