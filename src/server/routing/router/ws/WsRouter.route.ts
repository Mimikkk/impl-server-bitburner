import { Route } from "@server/routing/router/Router.route.ts";

export class WsRoute<R extends Route<any, any, any>> {
  static create = <R extends Route<any, any, any>>(
    route: R,
  ) => new WsRoute(route);

  private constructor(
    public readonly route: R,
  ) {}

  matches(request: Request): boolean {
    return request.url.endsWith(this.route.path);
  }

  handle(request: Request): Promise<Response> | Response {
    return this.route.controller[this.route.handler](request);
  }
}
