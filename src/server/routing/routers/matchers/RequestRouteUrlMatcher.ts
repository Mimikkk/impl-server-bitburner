import { RequestContext } from "@server/routing/routers/requests/RequestContext.ts";
import { RequestMatcher } from "@server/routing/routers/matchers/RequestMatcher.ts";
import { RouteSegment, RouteUrl } from "@server/routing/routers/routes/RouteUrl.ts";

export class RequestRouteUrlMatcher implements RequestMatcher {
  static create(url: RouteUrl): RequestRouteUrlMatcher {
    return new RequestRouteUrlMatcher(url);
  }

  private constructor(public readonly url: RouteUrl) {}

  matches(request: RequestContext): boolean {
    const parts = request.url.parts;
    const segments = this.url.segments;

    if (segments.length !== parts.length) return false;

    for (let i = 0, it = segments.length; i < it; ++i) {
      const segment = segments[i];
      const part = parts[i];

      if (segment.type === RouteSegment.Type.Parameter) continue;
      if (segment.part !== part) return false;
    }

    return true;
  }
}
