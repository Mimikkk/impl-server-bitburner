import { HttpRoute } from "@server/routing/impl/routers/http/HttpRouter.route.ts";
import { HttpJsonResponseCommon } from "@server/messages/responses/HttpJsonResponse.common.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";

export class HttpRouter<R extends HttpRoute[] = HttpRoute[]> {
  static create<R extends HttpRoute[]>(routes: R) {
    return new HttpRouter(routes);
  }

  private constructor(public readonly routes: R) {}

  dispatch(request: Request): Promise<Response> | Response {
    const pathname = new URL(request.url).pathname;
    const method = request.method as HttpMethod;

    const route = this.routes.find((route) => route.matches(method, pathname));

    if (!route) {
      return HttpJsonResponseCommon.noroute({ path: pathname, method });
    }

    return route.handle(request);
  }
}
