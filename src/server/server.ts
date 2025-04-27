import { ServerConfiguration } from "@server/configurations/ServerConfiguration.ts";
import { HttpRouter } from "@server/infrastructure/routing/routes/HttpRouter.ts";
import { WsRouter } from "@server/infrastructure/routing/routes/WsRouter.ts";
import { ApplicationComposer } from "./infrastructure/middlewares/ApplicationComposer.ts";
import { MiddlewareNs } from "./infrastructure/middlewares/MiddlewareNs.ts";

export const app = ApplicationComposer.of([
  MiddlewareNs.faviconRedirect(),
  MiddlewareNs.internalBarrier(),
  MiddlewareNs.timeout({ timeoutMs: 500 }),
  MiddlewareNs.routes({ http: HttpRouter, ws: WsRouter }),
]);

Deno.serve(ServerConfiguration, app);
