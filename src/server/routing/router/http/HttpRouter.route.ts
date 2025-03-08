import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { Route } from "@server/routing/router/Router.route.ts";

export class HttpRoute<
  M extends HttpMethod,
  R extends Route<any, any, any>,
> {
  static create<M extends HttpMethod, R extends Route<any, any, any>>(
    method: M,
    route: R,
  ) {
    return new HttpRoute(method, route);
  }

  private constructor(
    public readonly method: M,
    public readonly route: R,
  ) {}

  matches(request: Request): boolean {
    return this.method === request.method && request.url.endsWith(this.route.path);
  }

  handle(request: Request): Promise<Response> | Response {
    return this.route.controller[this.route.handler](request);
  }
}
