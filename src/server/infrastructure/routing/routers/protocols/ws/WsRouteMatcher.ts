import { RequestMatcher } from "@server/infrastructure/routing/routers/matchers/RequestMatcher.ts";
import { RequestRouteUrlMatcher } from "@server/infrastructure/routing/routers/matchers/RequestRouteUrlMatcher.ts";
import { RequestContext } from "@server/infrastructure/routing/routers/requests/RequestContext.ts";
import { RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";

export class WsRouteMatcher implements RequestMatcher {
  static create(url: RouteUrl): WsRouteMatcher {
    return new WsRouteMatcher(RequestRouteUrlMatcher.create(url));
  }

  private constructor(
    public readonly urlMatcher: RequestRouteUrlMatcher,
  ) {}

  matches(request: RequestContext): boolean {
    return this.urlMatcher.matches(request);
  }
}
