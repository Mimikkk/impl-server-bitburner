import { TypeKey } from "@shared/types/typedKey.ts";
import { ControlFn } from "@server/routing/router/ControlFn.ts";
import { Route } from "@server/routing/router/Router.route.ts";
import { Router } from "@server/routing/router/RRouter.ts";

export class RouterBuilder<R extends Route[] = Route[]> {
  static create(): RouterBuilder<[]> {
    return new RouterBuilder([]);
  }

  private constructor(public readonly routes: R) {}

  add<P extends `/${string}`, C, H extends TypeKey<C, ControlFn>>(
    path: ValidPath<this, P> extends true ? P : PathError,
    controller: C,
    handler: H,
  ): RouterBuilder<[...R, Route<P, C, H>]> {
    this.routes.push(Route.create(path as P, controller, handler));

    return this as unknown as RouterBuilder<[...R, Route<P, C, H>]>;
  }

  build(): Router<R> {
    return Router.create(this.routes);
  }
}
type ValidPath<R extends Router, P extends `/${string}`> = [P] extends [R["routes"][number]["route"]["path"]] ? false
  : true;
type PathError = "this path already exists";
