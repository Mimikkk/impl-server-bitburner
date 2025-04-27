import { Middleware } from "@server/infrastructure/middlewares/Middleware.ts";
import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";
import { Awaitable } from "@shared/types/common.ts";

export class DispatchMiddleware implements Middleware {
  static create(dispatcher: RouteDispatcher): DispatchMiddleware {
    return new DispatchMiddleware(dispatcher);
  }

  private constructor(private readonly dispatcher: RouteDispatcher) {}

  handle(request: Request): Awaitable<Response> {
    return this.dispatcher.dispatch(request);
  }
}
