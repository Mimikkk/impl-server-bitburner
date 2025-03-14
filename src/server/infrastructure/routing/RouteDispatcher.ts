import { http } from "@server/infrastructure/routing/routes/http.routes.ts";
import { ws } from "@server/infrastructure/routing/routes/ws.routes.ts";
import { Awaitable } from "@shared/types/common.ts";

export type Middleware = (request: Request) => Awaitable<Response | undefined>;

export class RouteDispatcher {
  static create() {
    return new RouteDispatcher();
  }

  private constructor() {}

  dispatch(request: Request) {
    if (request.headers.get("upgrade") === "websocket") {
      return ws.dispatch(request);
    }

    return http.dispatch(request);
  }

  handler(): Middleware {
    return (request) => this.dispatch(request);
  }
}
