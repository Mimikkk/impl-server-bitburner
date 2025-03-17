import { Awaitable } from "@shared/types/common.ts";
import { HttpRoutes } from "./routes/HttpRoutes.ts";
import { WsRoutes } from "./routes/WsRoutes.ts";

export type Middleware = (request: Request) => Awaitable<Response | undefined>;

export class RouteDispatcher {
  static create() {
    return new RouteDispatcher();
  }

  private constructor() {}

  dispatch(request: Request) {
    if (request.headers.get("upgrade") === "websocket") {
      return WsRoutes.dispatch(request);
    }

    return HttpRoutes.dispatch(request);
  }

  handler(): Middleware {
    return (request) => this.dispatch(request);
  }
}
