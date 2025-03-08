import { TypeKey } from "@shared/types/typedKey.ts";
import { ControlFn } from "@server/routing/router/ControlFn.ts";
import { WsRoute } from "@server/routing/router/ws/WsRouter.route.ts";
import { WsRouter } from "@server/routing/router/ws/WsRouter.ts";
import { Route } from "@server/routing/router/Router.route.ts";

export class WsRouterBuilder<R extends WsRoute<any>[]> {
  static create() {
    return new WsRouterBuilder([]);
  }

  private constructor(public readonly routes: R) {}

  ws<P extends `/${string}`, C, H extends TypeKey<C, ControlFn>>(
    path: ValidPath<this, P> extends true ? P : PathError,
    controller: C,
    handler: H,
  ): WsRouterBuilder<[...R, WsRoute<Route<P, C, H>>]> {
    this.routes.push(WsRoute.create(Route.create(path as P, controller, handler)));

    return this as unknown as WsRouterBuilder<[...R, WsRoute<Route<P, C, H>>]>;
  }

  build() {
    return WsRouter.create(this.routes);
  }
}
type ValidPath<R extends WsRouterBuilder<any>, P extends `/${string}`> = [P] extends
  [R["routes"][number]["route"]["path"]] ? false
  : true;

type PathError = "this path already exists";
