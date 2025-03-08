import { Route } from "@server/routing/router/Router.route.ts";

export class Router<R extends Route<any, any, any>[]> {
  static create<R extends Route<any, any, any>[]>(routes: R) {
    return new Router(routes);
  }

  private constructor(public readonly routes: R) {}
}
