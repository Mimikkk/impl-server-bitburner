import { RequestControllerHandler } from "@server/infrastructure/routing/routers/handlers/RequestControllerHandler.ts";
import { HttpRouteMatcher } from "@server/infrastructure/routing/routers/protocols/http/HttpRouteMatcher.ts";
import { Router } from "@server/infrastructure/routing/routers/Router.ts";
import { Route } from "@server/infrastructure/routing/routers/routes/Route.ts";
import { RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";
import { TypeKey } from "@shared/types/typedKey.ts";
import { HttpMethod } from "../../../../../../shared/enums/HttpMethod.ts";
import { ControllerRegistry } from "../../ControllerRegistry.ts";
import { ControlFn } from "../../handlers/ControllerType.ts";

export class HttpRouterBuilder<R extends Route[] = Route[]> {
  static create(): HttpRouterBuilder<[]> {
    return new HttpRouterBuilder([]);
  }

  private constructor(public readonly routes: R) {}

  add<
    M extends HttpMethod,
    P extends `/${string}`,
    C extends { create(): { [key in H]: ControlFn } },
    H extends TypeKey<ReturnType<C["create"]>, ControlFn>,
  >(
    { method, path, Controller, handler }: { method: M; path: P; Controller: C; handler: H },
  ): HttpRouterBuilder<[...R, Route]> {
    const url = RouteUrl.fromRoutePath(path);

    const controller = ControllerRegistry.resolve(Controller);

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
