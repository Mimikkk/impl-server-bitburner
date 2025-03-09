import { ServerConfiguration } from "@server/server.config.ts";
import { RouteDispatcher } from "./routing/RouteDispatcher.ts";

Deno.serve(ServerConfiguration, RouteDispatcher.dispatch);
