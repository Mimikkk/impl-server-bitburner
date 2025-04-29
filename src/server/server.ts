import { colors } from "@cliffy/ansi/colors";
import { ServerConfiguration } from "@server/configurations/ServerConfiguration.ts";
import { HttpRouter } from "@server/infrastructure/routing/routes/HttpRouter.ts";
import { WsRouter } from "@server/infrastructure/routing/routes/WsRouter.ts";
import { BitburnerFileWatcher } from "@server/modules/bitburner/infrastructure/files/BitburnerFileWatcher.ts";
import { Log } from "@shared/logging/log.ts";
import { ApplicationComposer } from "./infrastructure/middlewares/ApplicationComposer.ts";
import { MiddlewareNs } from "./infrastructure/middlewares/MiddlewareNs.ts";

export const server = ApplicationComposer.of([
  MiddlewareNs.redirect({
    redirects: [{ from: "/favicon.ico", to: "/static/favicon.ico" }],
  }),
  MiddlewareNs.barrier(),
  MiddlewareNs.timeout({ timeoutMs: 5000 }),
  MiddlewareNs.routes({ http: HttpRouter, ws: WsRouter }),
]);

const c = colors.yellow;
Log.info(`Started bitburner file watch.
       - Sychronizing every ${c("30 seconds")}.
       - Debouncing events by ${c("200 ms")}.`);

Deno.mkdirSync("src/client/servers", { recursive: true });
BitburnerFileWatcher.start({ syncMs: 30_000, debounceMs: 200 });
Deno.serve(ServerConfiguration, server);
