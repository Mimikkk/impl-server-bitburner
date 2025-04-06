import { Awaitable } from "@shared/types/common.ts";
import { HttpRouter } from "./routes/HttpRouter.ts";
import { WsRouter } from "./routes/WsRouter.ts";

export type Middleware = (request: Request) => Awaitable<Response | undefined>;

export class RouteDispatcher {
  static create() {
    return new RouteDispatcher();
  }

  private constructor() {}

  dispatch(request: Request): Awaitable<Response> {
    if (request.headers.get("upgrade") === "websocket") {
      return WsRouter.dispatch(request);
    }

    return HttpRouter.dispatch(request);
  }
}
