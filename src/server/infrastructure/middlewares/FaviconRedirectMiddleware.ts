import { Dispatch, Middleware } from "@server/infrastructure/middlewares/Middleware.ts";
import { Awaitable } from "@shared/types/common.ts";
import { RedirectMiddleware } from "./RedirectMiddleware.ts";

export class FaviconRedirectMiddleware implements Middleware {
  static create(): FaviconRedirectMiddleware {
    return new FaviconRedirectMiddleware();
  }

  private constructor(
    private readonly redirect: RedirectMiddleware = RedirectMiddleware.create({
      from: "/favicon.ico",
      to: "/static/favicon.ico",
    }),
  ) {}

  handle(request: Request, next: Dispatch): Awaitable<Response> {
    return this.redirect.handle(request, next);
  }
}
