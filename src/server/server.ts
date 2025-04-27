import { ServerConfiguration } from "@server/configurations/ServerConfiguration.ts";
import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";
import { Awaitable } from "@shared/types/common.ts";

type Middleware = (request: Request, next: (request: Request) => Awaitable<Response>) => Awaitable<Response>;

const faviconRedirectMiddleware: Middleware = (request, next) => {
  const url = new URL(request.url);
  if (url.pathname === "/favicon.ico") {
    request = new Request(`${url.origin}/static/favicon.ico`, request);
  }
  return next(request);
};

const internalBarrierMiddleware: Middleware = (request, next) => {
  try {
    return next(request);
  } catch (error) {
    return HttpJsonResponse.internal(error as Error);
  }
};

const createTimeoutMiddleware = (timeoutMs: number): Middleware => {
  return (request, next) => {
    const timeout = new Promise<Response>((resolve) =>
      setTimeout(() => resolve(HttpJsonResponse.timeout()), timeoutMs)
    );

    return Promise.race([next(request), timeout]);
  };
};

const createDispatchMiddleware = (handler: (request: Request) => Awaitable<Response>): Middleware => {
  return (request, _next) => handler(request);
};

const composeMiddleware = (middlewares: Middleware[]): (request: Request) => Awaitable<Response> => {
  return (request: Request) => {
    let current: (request: Request) => Awaitable<Response> = HttpJsonResponse.unimplemented;

    for (let i = middlewares.length - 1; i >= 0; i--) {
      const middleware = middlewares[i];
      const next = current;
      current = (request) => middleware(request, next);
    }

    return current(request);
  };
};

const dispatcher = RouteDispatcher.create();
const app = composeMiddleware([
  faviconRedirectMiddleware,
  internalBarrierMiddleware,
  createTimeoutMiddleware(500),
  createDispatchMiddleware(dispatcher.dispatch),
]);

Deno.serve(ServerConfiguration, app);
