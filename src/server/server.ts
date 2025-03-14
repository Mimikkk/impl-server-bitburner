import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";
import { ServerConfiguration } from "@server/server.config.ts";

const dispatcher = RouteDispatcher.create();

Deno.serve(ServerConfiguration, (request) => dispatcher.dispatch(request));
