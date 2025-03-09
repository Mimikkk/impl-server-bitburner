import { RequestContext } from "@server/routing/routers/requests/RequestContext.ts";
import { RequestMatcher } from "@server/routing/routers/matchers/RequestMatcher.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { RouteUrl } from "@server/routing/routers/routes/RouteUrl.ts";
import { RequestRouteUrlMatcher } from "@server/routing/routers/matchers/RequestRouteUrlMatcher.ts";
import { RequestMethodMatcher } from "@server/routing/routers/matchers/RequestMethodMatcher.ts";

export class HttpRouteMatcher implements RequestMatcher {
  static create(method: HttpMethod, url: RouteUrl): HttpRouteMatcher {
    return new HttpRouteMatcher(
      RequestMethodMatcher.create(method),
      RequestRouteUrlMatcher.create(url),
    );
  }

  private constructor(
    public readonly methodMatcher: RequestMethodMatcher,
    public readonly urlMatcher: RequestRouteUrlMatcher,
  ) {}

  matches(request: RequestContext): boolean {
    if (!this.methodMatcher.matches(request)) return false;
    if (!this.urlMatcher.matches(request)) return false;
    return true;
  }
}
