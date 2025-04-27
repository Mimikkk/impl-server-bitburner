import { ServerConfiguration } from "@server/configurations/ServerConfiguration.ts";
import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { Awaitable } from "@shared/types/common.ts";

interface Middleware {
  handle(request: Request, next: (request: Request) => Awaitable<Response>): Awaitable<Response>;
}

class FaviconRedirectMiddleware implements Middleware {
  static create() {
    return new FaviconRedirectMiddleware();
  }

  private constructor() {}

  handle(request: Request, next: (request: Request) => Awaitable<Response>): Awaitable<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/favicon.ico") {
      request = new Request(`${url.origin}/static/favicon.ico`, request);
    }

    return next(request);
  }
}

class InternalBarrierMiddleware implements Middleware {
  static create() {
    return new InternalBarrierMiddleware();
  }

  private constructor() {}

  handle(request: Request, next: (request: Request) => Awaitable<Response>): Awaitable<Response> {
    try {
      return next(request);
    } catch (error) {
      return HttpJsonResponse.internal(error as Error);
    }
  }
}

interface TimeoutMiddlewareOptions {
  timeoutMs: number;
}

class TimeoutMiddleware implements Middleware {
  static create({ timeoutMs }: TimeoutMiddlewareOptions) {
    return new TimeoutMiddleware(timeoutMs);
  }

  private constructor(private readonly timeoutMs: number) {}

  handle(request: Request, next: (request: Request) => Promise<Response>): Awaitable<Response> {
    const timeout = new Promise<Response>((resolve) =>
      setTimeout(() => resolve(HttpJsonResponse.timeout()), this.timeoutMs)
    );
    return Promise.race([next(request), timeout]);
  }
}

class MiddlewareComposer {
  static create(middlewares: Middleware[]) {
    return new MiddlewareComposer(middlewares);
  }

  private constructor(private readonly middlewares: Middleware[]) {}

  handle(request: Request): Awaitable<Response> {
    let current: (request: Request) => Awaitable<Response> = (req) => {
      throw new Error("No dispatch middleware found in the stack.");
    };

    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      const middleware = this.middlewares[i];
      const next = current;
      current = (request) => middleware.handle(request, next);
    }

    return current(request);
  }
}

class DispatchMiddleware implements Middleware {
  static create(handler: (request: Request) => Awaitable<Response>) {
    return new DispatchMiddleware(handler);
  }

  private constructor(private readonly handler: (request: Request) => Awaitable<Response>) {}

  handle(request: Request, _next: (request: Request) => Awaitable<Response>): Awaitable<Response> {
    return this.handler(request);
  }
}

const dispatcher = RouteDispatcher.create();
const app = MiddlewareComposer.create([
  FaviconRedirectMiddleware.create(),
  InternalBarrierMiddleware.create(),
  TimeoutMiddleware.create({ timeoutMs: 500 }),
  DispatchMiddleware.create(dispatcher.dispatch),
]);

Deno.serve(ServerConfiguration, (request) => {
  return app.handle(request);
});
