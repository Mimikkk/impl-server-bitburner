import { RequestControllerHandler } from "@server/infrastructure/routing/routers/handlers/RequestControllerHandler.ts";
import { WsRouteMatcher } from "@server/infrastructure/routing/routers/protocols/ws/WsRouteMatcher.ts";
import { Router } from "@server/infrastructure/routing/routers/Router.ts";
import { Route } from "@server/infrastructure/routing/routers/routes/Route.ts";
import { RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";
import { ControllerStore } from "../../../controllers/ControllerStore.ts";
import { Controller, ControllerClass, ControllerKey } from "../../../controllers/ControllerTypes.ts";

export class WsRouterBuilder<R extends Route[] = Route[]> {
  static create(): WsRouterBuilder<[]> {
    return new WsRouterBuilder([], ControllerStore.instance);
  }

  private constructor(
    private readonly routes: R,
    private readonly controllers: ControllerStore,
  ) {}

  ws<
    P extends string,
    C extends ControllerClass,
    H extends ControllerKey<Controller<C>>,
  >({ path, Controller, handler }: { path: P; Controller: C; handler: H }): WsRouterBuilder<[...R, Route]> {
    const url = RouteUrl.fromRoutePath(path);

    const controller = this.controllers.get(Controller);

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
