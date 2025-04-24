import { ServerConfiguration } from "@server/configurations/ServerConfiguration.ts";
import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";

const dispatcher = RouteDispatcher.create();
Deno.serve(ServerConfiguration, (request) => dispatcher.dispatch(request));
