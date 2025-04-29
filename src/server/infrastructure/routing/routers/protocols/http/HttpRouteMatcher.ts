import { RequestMatcher } from "@server/infrastructure/routing/routers/matchers/RequestMatcher.ts";
import { RequestMethodMatcher } from "@server/infrastructure/routing/routers/matchers/RequestMethodMatcher.ts";
import { RequestRouteUrlMatcher } from "@server/infrastructure/routing/routers/matchers/RequestRouteUrlMatcher.ts";
import { RequestContext } from "@server/infrastructure/routing/routers/requests/RequestContext.ts";
import { RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";
import { HttpMethod } from "../../../../../shared/enums/HttpMethod.ts";

export class HttpRouteMatcher implements RequestMatcher {
  static create(method: HttpMethod, url: RouteUrl): HttpRouteMatcher {
    return new HttpRouteMatcher(
      RequestMethodMatcher.create(method),
      RequestRouteUrlMatcher.create(url),
    );
  }

  private constructor(
    public readonly methodMatcher: RequestMethodMatcher,
    public readonly routeUrlMatcher: RequestRouteUrlMatcher,
  ) {}

  matches(request: RequestContext): boolean {
    if (!this.methodMatcher.matches(request)) return false;
    if (!this.routeUrlMatcher.matches(request)) return false;
    return true;
  }
}
