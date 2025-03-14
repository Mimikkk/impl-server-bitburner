import { Route } from "./routes/Route.ts";
import { RequestContext } from "./requests/RequestContext.ts";
import { HttpJsonResponseCommon } from "../../messaging/responses/HttpJsonResponse.common.ts";
import { RouteRequestContext } from "./routes/requests/RouteRequestContext.ts";

export class Router<R extends Route[] = Route[]> {
  static create<R extends Route[]>(routes: R) {
    return new Router(routes);
  }

  private constructor(public readonly routes: R) {}

  dispatch(request: Request): Promise<Response> | Response {
    const context = RequestContext.fromRequest(request);

    const route = this.routes.find((route) => route.matcher.matches(context));

    if (!route) {
      return HttpJsonResponseCommon.noroute({ path: context.url.pathname, method: context.method });
    }

    return route.handler.handle(request, RouteRequestContext.fromRequestRoute(context, route));
  }
}
