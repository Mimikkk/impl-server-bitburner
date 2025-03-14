import { TypeKey } from "@shared/types/typedKey.ts";
import { ControlFn } from "../../../../../application/controllers/controller.types.ts";
import { RequestControllerHandler } from "../../handlers/RequestControllerHandler.ts";
import { RouteUrl } from "../../routes/RouteUrl.ts";
import { Router } from "../../Router.ts";
import { Route } from "../../routes/Route.ts";
import { WsRouteMatcher } from "./WsRouteMatcher.ts";
import { ControllerRegistry } from "../../Router.controllers.ts";

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
