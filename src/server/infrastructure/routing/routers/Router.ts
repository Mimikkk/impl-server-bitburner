import { HttpRouterResponse } from "../../../presentation/messaging/http/responses/HttpRouterResponse.ts";
import { RequestContext } from "./requests/RequestContext.ts";
import { RouteRequestContext } from "./routes/requests/RouteRequestContext.ts";
import { Route } from "./routes/Route.ts";

export class Router<R extends Route[] = Route[]> {
  static create<R extends Route[]>(routes: R) {
    return new Router(routes);
  }

  private constructor(public readonly routes: R) {}

  async dispatch(request: Request): Promise<Response> {
    const context = RequestContext.fromRequest(request);

    const route = this.routes.find((route) => route.matcher.matches(context));

    if (!route) {
      return HttpRouterResponse.missing({ path: context.url.pathname, method: context.method });
    }

    return route.handler.handle(await RouteRequestContext.fromRequestRoute(context, route));
  }
}
