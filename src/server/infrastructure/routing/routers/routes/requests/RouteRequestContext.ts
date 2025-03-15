import { RequestContext } from "@server/infrastructure/routing/routers/requests/RequestContext.ts";
import { Route } from "@server/infrastructure/routing/routers/routes/Route.ts";
import { RouteRequestParameters } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestParameters.ts";

export class RouteRequestContext<P extends Record<string, any> = Record<string, any>> {
  static create<P extends Record<string, any>>(request: RequestContext, parameters: RouteRequestParameters<P>) {
    return new RouteRequestContext(request, parameters);
  }

  private constructor(
    public readonly request: RequestContext,
    public readonly parameters: RouteRequestParameters<P>,
  ) {}

  static fromRequestRoute(request: RequestContext, route: Route) {
    return RouteRequestContext.create(
      request,
      RouteRequestParameters.fromUrls(route.url, request.url),
    );
  }
}
