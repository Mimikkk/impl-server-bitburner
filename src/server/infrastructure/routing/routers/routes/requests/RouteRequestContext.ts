import { RequestContext } from "@server/infrastructure/routing/routers/requests/RequestContext.ts";
import { Route } from "@server/infrastructure/routing/routers/routes/Route.ts";
import { RouteRequestParameters } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestParameters.ts";
import { Merge } from "@server/shared/types/common.ts";
import { RouteRequestContent } from "./RouteRequestContent.ts";

export class RouteRequestContext<
  Parameters extends Record<string, any> = Record<string, any>,
  Content extends object | null = object | null,
> {
  static create<Parameters extends Record<string, any>, Content extends object | null>(
    request: RequestContext,
    parameters: RouteRequestParameters<Parameters>,
    content: RouteRequestContent<Content>,
  ) {
    return new RouteRequestContext(request, parameters, content);
  }

  private constructor(
    public readonly request: RequestContext,
    public readonly parameters: RouteRequestParameters<Parameters>,
    public readonly content: RouteRequestContent<Content>,
  ) {}

  static async fromRequestRoute(request: RequestContext, route: Route) {
    return RouteRequestContext.create(
      request,
      RouteRequestParameters.fromUrls(route.url, request.url),
      await RouteRequestContent.fromRequestContext(request),
    );
  }

  withParameters<P extends Record<string, any>>(parameters: P): RouteRequestContext<Merge<Parameters, P>, Content> {
    Object.assign(this.parameters.values, parameters);
    return this as RouteRequestContext<Merge<Parameters, P>, Content>;
  }
}
