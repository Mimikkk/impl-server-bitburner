import { Route } from "@server/routing/impl/routers/Router.route.ts";

export class WsRoute<R extends Route = Route> {
  static create = <R extends Route>(
    route: R,
  ) => new WsRoute(route);

  private constructor(
    public readonly route: R,
  ) {}

  matches(pathname: string): boolean {
    return pathname === this.route.path;
  }

  handle(request: Request): Promise<Response> | Response {
    return this.route.controller[this.route.handler](request);
  }
}
