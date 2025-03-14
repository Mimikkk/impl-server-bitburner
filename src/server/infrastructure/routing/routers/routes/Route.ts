import { RouteUrl } from "./RouteUrl.ts";
import { RequestMatcher } from "../matchers/RequestMatcher.ts";
import { RequestHandler } from "../handlers/RequestHandler.ts";
export class Route {
  static create = (url: RouteUrl, matcher: RequestMatcher, handler: RequestHandler) => {
    return new Route(url, matcher, handler);
  };

  private constructor(
    public readonly url: RouteUrl,
    public readonly matcher: RequestMatcher,
    public readonly handler: RequestHandler,
  ) {}
}
