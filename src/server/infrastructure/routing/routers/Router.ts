import { Awaitable } from "@shared/types/common.ts";
import { HttpJsonResponseCommon } from "../../messaging/responses/HttpJsonResponse.common.ts";
import { RequestContext } from "./requests/RequestContext.ts";
import { RouteRequestContext } from "./routes/requests/RouteRequestContext.ts";
import { Route } from "./routes/Route.ts";

export class Router<R extends Route[] = Route[]> {
  static create<R extends Route[]>(routes: R) {
    return new Router(routes);
  }

  private constructor(public readonly routes: R) {}

  dispatch(request: Request): Awaitable<Response> {
    const context = RequestContext.fromRequest(request);

    const route = this.routes.find((route) => route.matcher.matches(context));

    if (!route) {
      return HttpJsonResponseCommon.noroute({ path: context.url.pathname, method: context.method });
    }

    return route.handler.handle(request, RouteRequestContext.fromRequestRoute(context, route));
  }
}
