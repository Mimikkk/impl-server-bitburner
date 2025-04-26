import { HttpRouter } from "./routes/HttpRouter.ts";
import { WsRouter } from "./routes/WsRouter.ts";

export class RouteDispatcher {
  static create() {
    return new RouteDispatcher();
  }

  private constructor() {}

  dispatch(request: Request): Promise<Response> {
    if (request.headers.get("upgrade") === "websocket") {
      return WsRouter.dispatch(request);
    }

    return HttpRouter.dispatch(request);
  }
}
