import { ServerConfiguration } from "@server/configurations/ServerConfiguration.ts";
import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";
import { MiddlewareComposer } from "./infrastructure/middlewares/MiddlewareComposer.ts";
import { MiddlewareNs } from "./infrastructure/middlewares/MiddlewareNs.ts";

export const app = MiddlewareComposer.of([
  MiddlewareNs.faviconRedirect(),
  MiddlewareNs.internalBarrier(),
  MiddlewareNs.timeout({ timeoutMs: 500 }),
  MiddlewareNs.dispatch(RouteDispatcher.create()),
]);

Deno.serve(ServerConfiguration, app);
