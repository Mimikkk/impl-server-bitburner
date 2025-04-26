import { ServerConfiguration } from "@server/configurations/ServerConfiguration.ts";
import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";

interface TimeoutMiddlewareOptions {
  timeoutMs: number;
}

const dispatcher = RouteDispatcher.create();
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const redirectFavicon = (request: Request) => {
  if (request.url.endsWith(`${new URL(request.url).origin}/favicon.ico`)) {
    return new Request(`${new URL(request.url).origin}/static/favicon.ico`, request);
  }

  return request;
};

const InternalBarrierMiddleware: Middleware = async (request, next) => {
  try {
    return await next(request);
  } catch (error) {
    return HttpJsonResponse.internal(error as Error);
  }
};

const TimeoutMiddleware = ({ timeoutMs }: TimeoutMiddlewareOptions): Middleware => (request, next) => {
  const timeout = new Promise<Response>((resolve) => setTimeout(() => resolve(HttpJsonResponse.timeout()), timeoutMs));

  return Promise.race([timeout, next(request)]);
};

type Middleware = (request: Request, next: (request: Request) => Promise<Response>) => Promise<Response>;

const composeMiddleware = (...middlewares: Middleware[]) => {
  return (request: Request, handler: (request: Request) => Promise<Response>): Promise<Response> => {
    let index = -1;

    const dispatch = (i: number, request: Request): Promise<Response> => {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }

      index = i;

      if (i === middlewares.length) {
        return handler(request);
      }

      return middlewares[i](request, (request) => dispatch(i + 1, request));
    };

    return dispatch(0, request);
  };
};

Deno.serve(ServerConfiguration, (request) => {
  request = redirectFavicon(request);

  const use = composeMiddleware(
    InternalBarrierMiddleware,
    TimeoutMiddleware({ timeoutMs: 500 }),
  );

  return use(request, dispatcher.dispatch);
});
