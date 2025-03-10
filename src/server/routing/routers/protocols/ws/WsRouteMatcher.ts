import { RequestMatcher } from "@server/routing/routers/matchers/RequestMatcher.ts";
import { RequestRouteUrlMatcher } from "@server/routing/routers/matchers/RequestRouteUrlMatcher.ts";
import { RequestContext } from "@server/routing/routers/requests/RequestContext.ts";
import { RouteUrl } from "@server/routing/routers/routes/RouteUrl.ts";

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
