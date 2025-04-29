import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { Awaitable } from "@server/shared/types/common.ts";

export interface RequestHandler<C extends RouteRequestContext = RouteRequestContext> {
  handle(context: C): Awaitable<Response>;
}
