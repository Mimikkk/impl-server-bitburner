import { TypeKey } from "@shared/types/typedKey.ts";
import { ControlFn } from "@server/controllers/controller.types.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { RequestControllerHandler } from "@server/routing/routers/handlers/RequestControllerHandler.ts";
import { RouteUrl } from "@server/routing/routers/routes/RouteUrl.ts";
import { Route } from "@server/routing/routers/routes/Route.ts";
import { Router } from "@server/routing/routers/Router.ts";
import { HttpRouteMatcher } from "@server/routing/protocols/http/HttpRouteMatcher.ts";

export class HttpRouterBuilder<R extends Route[] = Route[]> {
  static create(): HttpRouterBuilder<[]> {
    return new HttpRouterBuilder([]);
  }

  private constructor(public readonly routes: R) {}

  add<
    M extends HttpMethod,
    P extends `/${string}`,
    C extends { [key in H]: ControlFn },
    H extends TypeKey<C, ControlFn>,
  >(
    method: M,
    path: P,
    controller: C,
    handler: H,
  ): HttpRouterBuilder<[...R, Route]> {
    const url = RouteUrl.fromRoutePath(path);

    const route = Route.create(
      url,
      HttpRouteMatcher.create(method, url),
      RequestControllerHandler.create(controller, handler),
    );

    this.routes.push(route);

    return this as unknown as HttpRouterBuilder<[...R, Route]>;
  }

  build(): Router<R> {
    return Router.create(this.routes);
  }
}
