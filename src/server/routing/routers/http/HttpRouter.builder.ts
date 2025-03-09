import { TypeKey } from "@shared/types/typedKey.ts";
import { ControlFn } from "../../../controllers/controller.types.ts";
import { HttpRoute } from "@server/routing/router/http/HttpRouter.route.ts";
import { HttpRouter } from "@server/routing/router/http/HttpRouter.ts";
import { Route } from "@server/routing/router/Router.route.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";

export class HttpRouterBuilder<R extends HttpRoute[] = HttpRoute[]> {
  static create(): HttpRouterBuilder<[]> {
    return new HttpRouterBuilder([]);
  }

  private constructor(public readonly routes: R) {}

  add<
    M extends HttpMethod,
    P extends `/${string}`,
    C,
    H extends TypeKey<C, ControlFn>,
  >(
    method: ValidMethodPath<this, M, P> extends true ? M : MethodPathError,
    path: P,
    controller: C,
    handler: H,
  ): HttpRouterBuilder<[...R, HttpRoute<M, Route<P, C, H>>]> {
    this.routes.push(HttpRoute.create(method as M, Route.create(path, controller, handler)));

    return this as unknown as HttpRouterBuilder<[...R, HttpRoute<M, Route<P, C, H>>]>;
  }

  get<
    P extends `/${string}`,
    C,
    H extends TypeKey<C, ControlFn>,
  >(
    path: ValidMethodPath<this, HttpMethod.Get, P> extends true ? P : MethodPathError,
    controller: C,
    handler: H,
  ): HttpRouterBuilder<[...R, HttpRoute<HttpMethod.Get, Route<P, C, H>>]> {
    return this.add(HttpMethod.Get as never, path as never, controller, handler);
  }

  post<
    P extends `/${string}`,
    C,
    H extends TypeKey<C, ControlFn>,
  >(
    path: ValidMethodPath<this, HttpMethod.Post, P> extends true ? P : MethodPathError,
    controller: C,
    handler: H,
  ): HttpRouterBuilder<[...R, HttpRoute<HttpMethod.Post, Route<P, C, H>>]> {
    return this.add(HttpMethod.Post as never, path as never, controller, handler);
  }

  put<
    P extends `/${string}`,
    C,
    H extends TypeKey<C, ControlFn>,
  >(
    path: ValidMethodPath<this, HttpMethod.Put, P> extends true ? P : MethodPathError,
    controller: C,
    handler: H,
  ): HttpRouterBuilder<[...R, HttpRoute<HttpMethod.Put, Route<P, C, H>>]> {
    return this.add(HttpMethod.Put as never, path as never, controller, handler);
  }

  patch<
    P extends `/${string}`,
    C,
    H extends TypeKey<C, ControlFn>,
  >(
    path: ValidMethodPath<this, HttpMethod.Patch, P> extends true ? P : MethodPathError,
    controller: C,
    handler: H,
  ): HttpRouterBuilder<[...R, HttpRoute<HttpMethod.Patch, Route<P, C, H>>]> {
    return this.add(HttpMethod.Patch as never, path as never, controller, handler);
  }

  delete<
    P extends `/${string}`,
    C,
    H extends TypeKey<C, ControlFn>,
  >(
    path: ValidMethodPath<this, HttpMethod.Delete, P> extends true ? P : MethodPathError,
    controller: C,
    handler: H,
  ): HttpRouterBuilder<[...R, HttpRoute<HttpMethod.Delete, Route<P, C, H>>]> {
    return this.add(HttpMethod.Delete as never, path as never, controller, handler);
  }

  build(): HttpRouter<R> {
    return HttpRouter.create(this.routes);
  }
}

type ValidMethodPath<
  Router extends HttpRouterBuilder,
  Method extends HttpMethod,
  Path extends `/${string}`,
> = [Method, Path] extends [Router["routes"][number]["method"], Router["routes"][number]["route"]["path"]] ? false
  : true;

type MethodPathError = "this method path pair already exists";
