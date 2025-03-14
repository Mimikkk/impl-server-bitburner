import { ws } from "./routes/ws.routes.ts";
import { http } from "./routes/http.routes.ts";

export namespace RouteDispatcher {
  export const dispatch = (request: Request) => {
    if (request.headers.get("upgrade") === "websocket") {
      return ws.dispatch(request);
    }

    return http.dispatch(request);
  };
}
