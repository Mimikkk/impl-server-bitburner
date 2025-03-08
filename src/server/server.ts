import { ServerConfiguration } from "@server/server.config.ts";
import { ApiRouter } from "@server/routing/routes/api.routes.ts";

Deno.serve(ServerConfiguration, ApiRouter.dispatch);
