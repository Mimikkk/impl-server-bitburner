import { ServerConfiguration } from "@server/server.config.ts";
import { RouteDispatcher } from "@server/routing/RouteDispatcher.ts";

Deno.serve(ServerConfiguration, RouteDispatcher.dispatch);
