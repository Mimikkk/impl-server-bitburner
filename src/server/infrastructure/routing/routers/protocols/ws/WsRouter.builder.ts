import { RequestControllerHandler } from "@server/infrastructure/routing/routers/handlers/RequestControllerHandler.ts";
import { WsRouteMatcher } from "@server/infrastructure/routing/routers/protocols/ws/WsRouteMatcher.ts";
import { ControllerRegistry } from "@server/infrastructure/routing/routers/Router.controllers.ts";
import { Router } from "@server/infrastructure/routing/routers/Router.ts";
import { Route } from "@server/infrastructure/routing/routers/routes/Route.ts";
import { RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";
import { TypeKey } from "@shared/types/typedKey.ts";
import { ControlFn } from "../../handlers/ControllerType.ts";

export class WsRouterBuilder<R extends Route[] = Route[]> {
  static create(): WsRouterBuilder<[]> {
    return new WsRouterBuilder([]);
  }

  private constructor(public readonly routes: R) {}

  ws<
    P extends `/${string}`,
    C extends { create(): { [key in H]: ControlFn } },
    H extends TypeKey<ReturnType<C["create"]>, ControlFn>,
  >(
    path: P,
    Controller: C,
    handler: H,
  ): WsRouterBuilder<[...R, Route]> {
    const url = RouteUrl.fromRoutePath(path);

    const controller = ControllerRegistry.resolve(Controller);

    const route = Route.create(
      url,
      WsRouteMatcher.create(url),
      RequestControllerHandler.create(controller, handler),
    );

    this.routes.push(route);

    return this as unknown as WsRouterBuilder<[...R, Route]>;
  }

  build(): Router<R> {
    return Router.create(this.routes);
  }
}
