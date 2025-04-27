import { Dispatch, Middleware } from "@server/infrastructure/middlewares/Middleware.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";

export class MiddlewareComposer {
  static create(middlewares: Middleware[]): MiddlewareComposer {
    return new MiddlewareComposer(middlewares);
  }

  private constructor(private readonly middlewares: Middleware[]) {}

  static of(middlewares: Middleware[]): Dispatch {
    return MiddlewareComposer.create(middlewares).compose();
  }

  compose(): Dispatch {
    let current: Dispatch = HttpJsonResponse.unimplemented;

    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      const middleware = this.middlewares[i];
      const next = current;
      current = (request) => middleware.handle(request, next);
    }

    return current;
  }
}
