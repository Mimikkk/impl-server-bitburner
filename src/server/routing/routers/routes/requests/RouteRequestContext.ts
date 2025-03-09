import { RequestContext } from "@server/routing/routers/requests/RequestContext.ts";
import { RouteRequestParameters } from "@server/routing/routers/routes/requests/RouteRequestParameters.ts";
import { Route } from "@server/routing/routers/routes/Route.ts";

export class RouteRequestContext {
  static create(request: RequestContext, parameters: RouteRequestParameters) {
    return new RouteRequestContext(request, parameters);
  }

  private constructor(
    public readonly request: RequestContext,
    public readonly parameters: RouteRequestParameters,
  ) {}

  static fromRequestRoute(request: RequestContext, route: Route) {
    return RouteRequestContext.create(
      request,
      RouteRequestParameters.fromUrls(route.url, request.url),
    );
  }
}
