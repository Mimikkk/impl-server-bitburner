import { Dispatch, Middleware } from "@server/infrastructure/middlewares/Middleware.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { Awaitable } from "@server/shared/types/common.ts";

export interface TimeoutMiddlewareOptions {
  timeoutMs: number;
}

export class TimeoutMiddleware implements Middleware {
  static create({ timeoutMs }: TimeoutMiddlewareOptions): TimeoutMiddleware {
    return new TimeoutMiddleware(timeoutMs);
  }

  private constructor(private readonly timeoutMs: number) {}

  handle(request: Request, next: Dispatch): Awaitable<Response> {
    const timeout = new Promise<Response>((resolve) =>
      setTimeout(() => resolve(HttpJsonResponse.timeout()), this.timeoutMs)
    );

    return Promise.race([next(request), timeout]);
  }
}
