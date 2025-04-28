import { colors } from "@cliffy/ansi/colors";
import { ServerConfiguration } from "@server/configurations/ServerConfiguration.ts";
import { FileWatcherHandlers } from "@server/infrastructure/files/watchers/FileWatcherHandlers.ts";
import { HttpRouter } from "@server/infrastructure/routing/routes/HttpRouter.ts";
import { WsRouter } from "@server/infrastructure/routing/routes/WsRouter.ts";
import { Log } from "@shared/logging/log.ts";
import { FileWatch } from "./infrastructure/files/watchers/FileWatcher.ts";
import { ApplicationComposer } from "./infrastructure/middlewares/ApplicationComposer.ts";
import { MiddlewareNs } from "./infrastructure/middlewares/MiddlewareNs.ts";

const c = colors.yellow;
export const server = ApplicationComposer.of([
  MiddlewareNs.redirect({
    redirects: [{ from: "/favicon.ico", to: "/static/favicon.ico" }],
  }),
  MiddlewareNs.barrier(),
  MiddlewareNs.timeout({ timeoutMs: 5000 }),
  MiddlewareNs.routes({ http: HttpRouter, ws: WsRouter }),
]);

const onEvent = (event: Deno.FsEvent) => {
  const path = event.paths[0];
  const kind = event.kind;

  if (kind === "modify") {
    Log.event(`File ${c(path)} was modified.`);
  }

  if (kind === "create") {
    Log.event(`File ${c(path)} was created.`);
  }

  if (kind === "remove") {
    Log.event(`File ${c(path)} was removed.`);
  }

  if (kind === "rename") {
    Log.event(`File ${c(path)} was renamed.`);
  }

  if (kind === "access") {
    Log.event(`File ${c(path)} was accessed.`);
  }
};

FileWatch.start("src/client/servers", {
  handlers: [FileWatcherHandlers.debounce({ onEvent, debounceMs: 200 })],
});

Deno.serve(ServerConfiguration, server);
