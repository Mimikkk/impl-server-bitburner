import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";
import { ServerConfiguration } from "@server/server.config.ts";

Deno.serve(ServerConfiguration, RouteDispatcher.dispatch);
