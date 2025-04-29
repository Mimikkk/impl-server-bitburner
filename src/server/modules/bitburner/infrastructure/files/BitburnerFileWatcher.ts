import { colors } from "@cliffy/ansi/colors";
import { FileWatch } from "@server/infrastructure/files/watchers/FileWatcher.ts";
import { FileWatcherHandlers } from "@server/infrastructure/files/watchers/FileWatcherHandlers.ts";
import { BitburnerFileEventHandler } from "@server/modules/bitburner/infrastructure/files/BitburnerFileEventHandler.ts";
import { BitburnerFileSynchronizer } from "@server/modules/bitburner/infrastructure/files/BitburnerFileSynchronizer.ts";
import { ConnectionModel } from "@server/modules/connections/domain/models/ConnectionModel.ts";
import { Log } from "@shared/logging/log.ts";

interface BitburnerFileWatcherOptions {
  syncMs?: number;
  debounceMs?: number;
}

export class BitburnerFileWatcher {
  static create(connection: ConnectionModel, options?: BitburnerFileWatcherOptions) {
    return new BitburnerFileWatcher(options?.syncMs ?? 30_000, options?.debounceMs ?? 200, connection);
  }

  private constructor(
    syncMs: number,
    debounceMs: number,
    connection: ConnectionModel,
    private readonly synchronizer = BitburnerFileSynchronizer.create({ syncMs }),
    private readonly events = BitburnerFileEventHandler.create(connection),
    private readonly watcher = FileWatch.create("src/client/servers", {
      handlers: [
        FileWatcherHandlers.debounce({
          onEvent: (event) => this.events.handle(event),
          debounceMs,
        }),
        FileWatcherHandlers.callback({
          onEvent: () => this.synchronizer.schedule(),
        }),
      ],
    }),
  ) {}

  static start(connection: ConnectionModel, options?: BitburnerFileWatcherOptions) {
    const c = colors.yellow;
    Deno.mkdirSync("src/client/servers", { recursive: true });

    Log.info(`Started bitburner file watch.
       - Sychronizing every ${c(`${options?.syncMs ?? 30_000}ms`)}.
       - Debouncing events by ${c(`${options?.debounceMs ?? 200}ms`)}.`);

    return BitburnerFileWatcher.create(connection, options).start();
  }

  start() {
    return this.watcher.start();
  }

  stop() {
    return this.watcher.stop();
  }

  sync() {
    return this.synchronizer.sync();
  }
}
