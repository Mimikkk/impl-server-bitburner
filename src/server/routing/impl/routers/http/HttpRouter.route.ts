import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { Route } from "@server/routing/impl/routers/Router.route.ts";

export class HttpRoute<
  M extends HttpMethod = any,
  R extends Route = Route,
> {
  static create<M extends HttpMethod, R extends Route>(
    method: M,
    route: R,
  ): HttpRoute<M, R> {
    return new HttpRoute(method, route);
  }

  private constructor(
    public readonly method: M,
    public readonly route: R,
  ) {}

  matches(method: HttpMethod, pathname: string): boolean {
    if (this.method !== method) return false;
    const segments = pathname.split("/");

    if (segments.length !== this.route.segments.length) {
      return false;
    }

    for (let i = 0; i < segments.length; i++) {
      const routeSegment = this.route.segments[i];
      if (routeSegment.type === "parameter") continue;

      if (segments[i] !== routeSegment.value) {
        return false;
      }
    }

    return true;
  }

  handle(request: Request): Promise<Response> | Response {
    return this.route.controller[this.route.handler](request);
  }
}
