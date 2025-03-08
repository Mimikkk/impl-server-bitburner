import { WsRoute } from "@server/routing/router/ws/WsRouter.route.ts";
import { HttpJsonResponseCommon } from "@server/messages/responses/HttpJsonResponse.common.ts";

export class WsRouter<R extends WsRoute<any>[]> {
  static create<R extends WsRoute<any>[]>(routes: R) {
    return new WsRouter(routes);
  }

  private constructor(public readonly routes: R) {}

  dispatch(request: Request): Promise<Response> | Response {
    const route = this.routes.find((route) => route.matches(request));

    if (!route) {
      return HttpJsonResponseCommon.noroute({ path: request.url, method: request.method });
    }

    return route.handle(request);
  }
}
