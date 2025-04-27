import { Dispatch, Middleware } from "@server/infrastructure/middlewares/Middleware.ts";
import { Awaitable } from "@shared/types/common.ts";

export interface RedirectMiddlewareOptions {
  from: string;
  to: string;
}

export class RedirectMiddleware implements Middleware {
  static create({ from, to }: RedirectMiddlewareOptions): RedirectMiddleware {
    return new RedirectMiddleware(from, to);
  }

  private constructor(private readonly from: string, private readonly to: string) {}

  handle(request: Request, next: Dispatch): Awaitable<Response> {
    const url = new URL(request.url);

    if (url.pathname === this.from) {
      request = new Request(`${url.origin}${this.to}`, request);
    }

    return next(request);
  }
}
