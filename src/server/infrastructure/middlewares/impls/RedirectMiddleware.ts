import { Dispatch, Middleware } from "@server/infrastructure/middlewares/Middleware.ts";
import { Awaitable } from "@server/shared/types/common.ts";

export interface RedirectMiddlewareOptions {
  redirects: { from: string; to: string }[];
}

export class RedirectMiddleware implements Middleware {
  static create({ redirects }: RedirectMiddlewareOptions): RedirectMiddleware {
    const map = new Map(redirects.map(({ from, to }) => [from, to]));
    return new RedirectMiddleware(map);
  }

  private constructor(private readonly redirects: Map<string, string>) {}

  handle(request: Request, next: Dispatch): Awaitable<Response> {
    const url = new URL(request.url);

    const to = this.redirects.get(url.pathname);
    if (to) {
      request = new Request(`${url.origin}${to}`, request);
    }

    return next(request);
  }
}
