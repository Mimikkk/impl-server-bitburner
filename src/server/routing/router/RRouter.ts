import { Route } from "@server/routing/router/Router.route.ts";

export class Router<R extends Route[] = Route[]> {
  static create<R extends Route[]>(routes: R) {
    return new Router(routes);
  }

  private constructor(public readonly routes: R) {}
}
