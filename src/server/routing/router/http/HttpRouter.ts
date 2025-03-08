import { HttpRoute } from "@server/routing/router/http/HttpRouter.route.ts";
import { HttpJsonResponseCommon } from "@server/messages/responses/HttpJsonResponse.common.ts";

export class HttpRouter<R extends HttpRoute<any, any>[]> {
  static create<R extends HttpRoute<any, any>[]>(routes: R) {
    return new HttpRouter(routes);
  }

  private constructor(public readonly routes: R) {}

  dispatch(request: Request): Promise<Response> | Response {
    const route = this.routes.find((route) => route.matches(request));

    if (!route) {
      const method = request.method;
      const path = new URL(request.url).pathname;
      return HttpJsonResponseCommon.noroute({ path, method });
    }

    return route.handle(request);
  }
}
