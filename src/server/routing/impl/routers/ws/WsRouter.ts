import { WsRoute } from "@server/routing/impl/routers/ws/WsRouter.route.ts";
import { HttpJsonResponseCommon } from "@server/messages/responses/HttpJsonResponse.common.ts";

export class WsRouter<R extends WsRoute[] = WsRoute[]> {
  static create<R extends WsRoute[]>(routes: R) {
    return new WsRouter(routes);
  }

  private constructor(public readonly routes: R) {}

  dispatch(request: Request): Promise<Response> | Response {
    const pathname = new URL(request.url).pathname;
    const route = this.routes.find((route) => route.matches(pathname));

    if (!route) {
      return HttpJsonResponseCommon.noroute({ path: pathname, method: request.method });
    }

    return route.handle(request);
  }
}
