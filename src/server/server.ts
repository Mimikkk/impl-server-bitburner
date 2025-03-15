import { ServerConfiguration } from "@server/infrastructure/configurations/ServerConfiguration.ts";
import { RouteDispatcher } from "@server/infrastructure/routing/RouteDispatcher.ts";

const dispatcher = RouteDispatcher.create();

Deno.serve(ServerConfiguration, (request) => dispatcher.dispatch(request));
