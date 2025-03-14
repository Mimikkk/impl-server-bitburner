import { RequestMatcher } from "../../matchers/RequestMatcher.ts";
import { RequestRouteUrlMatcher } from "../../matchers/RequestRouteUrlMatcher.ts";
import { RequestContext } from "../../requests/RequestContext.ts";
import { RouteUrl } from "../../routes/RouteUrl.ts";

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
