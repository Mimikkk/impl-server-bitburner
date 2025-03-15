import { RequestContext } from "../requests/RequestContext.ts";
import { RouteSegment, RouteUrl } from "../routes/RouteUrl.ts";
import { RequestMatcher } from "./RequestMatcher.ts";

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

      if (segment.variant === RouteSegment.Variant.Parameter) continue;
      if (segment.part !== part) return false;
    }

    return true;
  }
}
