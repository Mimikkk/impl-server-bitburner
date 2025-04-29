import { Dispatch, Middleware } from "@server/infrastructure/middlewares/Middleware.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { Awaitable } from "@server/shared/types/common.ts";

export class BarrierMiddleware implements Middleware {
  static create(): BarrierMiddleware {
    return new BarrierMiddleware();
  }

  private constructor() {}

  handle(request: Request, next: Dispatch): Awaitable<Response> {
    try {
      return next(request);
    } catch (error) {
      return HttpJsonResponse.internal(error);
    }
  }
}
