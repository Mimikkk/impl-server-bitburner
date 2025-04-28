import { FileWatch } from "@server/infrastructure/files/watchers/FileWatcher.ts";
import { FileWatcherHandlers } from "@server/infrastructure/files/watchers/FileWatcherHandlers.ts";
import { BitburnerFileEventHandler } from "@server/modules/bitburner/infrastructure/files/BitburnerFileEventHandler.ts";
import { BitburnerFileSynchronizer } from "@server/modules/bitburner/infrastructure/files/BitburnerFileSynchronizer.ts";

interface BitburnerFileWatcherOptions {
  syncMs?: number;
  debounceMs?: number;
}

export class BitburnerFileWatcher {
  static create(options?: BitburnerFileWatcherOptions) {
    return new BitburnerFileWatcher(
      options?.syncMs ?? 30_000,
      options?.debounceMs ?? 200,
    );
  }

  private constructor(
    syncMs: number,
    debounceMs: number,
    private readonly synchronizer = BitburnerFileSynchronizer.create({ syncMs }),
    private readonly events = BitburnerFileEventHandler.create(),
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

  static start(options?: BitburnerFileWatcherOptions) {
    return BitburnerFileWatcher.create(options).start();
  }

  async start() {
    return this.watcher.start();
  }
}
