import { ws } from "@server/routing/routes/ws.routes.ts";
import { http } from "@server/routing/routes/http.routes.ts";

export namespace ApiRouter {
  export const dispatch = (request: Request) => {
    if (request.headers.get("upgrade") === "websocket") {
      return ws.dispatch(request);
    }

    return http.dispatch(request);
  };
}
