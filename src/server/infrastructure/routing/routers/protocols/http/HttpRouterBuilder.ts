import { RequestControllerHandler } from "@server/infrastructure/routing/routers/handlers/RequestControllerHandler.ts";
import { HttpRouteMatcher } from "@server/infrastructure/routing/routers/protocols/http/HttpRouteMatcher.ts";
import { Router } from "@server/infrastructure/routing/routers/Router.ts";
import { Route } from "@server/infrastructure/routing/routers/routes/Route.ts";
import { RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";
import { HttpMethod } from "../../../../../shared/enums/HttpMethod.ts";
import { ControllerStore } from "../../../controllers/ControllerStore.ts";
import { Controller, ControllerClass, ControllerKey } from "../../../controllers/ControllerTypes.ts";

export class HttpRouterBuilder<R extends Route[] = Route[]> {
  static create(): HttpRouterBuilder<[]> {
    return new HttpRouterBuilder([], ControllerStore.instance);
  }

  private constructor(
    private readonly routes: R,
    private readonly controllers: ControllerStore,
  ) {}

  add<
    M extends HttpMethod,
    P extends string,
    C extends ControllerClass,
    H extends ControllerKey<Controller<C>>,
  >(
    { method, path, Controller, handler }: { method: M; path: P; Controller: C; handler: H },
  ): HttpRouterBuilder<[...R, Route]> {
    const url = RouteUrl.fromRoutePath(path);

    const controller = this.controllers.get(Controller);

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
