import { Awaitable } from "@shared/types/common.ts";
import { HttpRouterResponse } from "../messaging/responses/HttpRouterResponse.ts";
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
      return HttpRouterResponse.missing({ path: context.url.pathname, method: context.method });
    }

    return route.handler.handle(RouteRequestContext.fromRequestRoute(context, route));
  }
}
