import { Dispatch, Middleware } from "@server/infrastructure/middlewares/Middleware.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { Awaitable } from "@shared/types/common.ts";

export class InternalBarrierMiddleware implements Middleware {
  static create(): InternalBarrierMiddleware {
    return new InternalBarrierMiddleware();
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
