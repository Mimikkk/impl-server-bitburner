import { FileWatchHandler } from "@server/infrastructure/files/watchers/handlers/FileWatchHandler.ts";

export interface FileWatcherOptions {
  handlers?: FileWatchHandler[];
}

export class FileWatch {
  static create(path: string, options?: FileWatcherOptions) {
    return new FileWatch(path, options?.handlers || []);
  }

  static start(path: string, options?: FileWatcherOptions) {
    return FileWatch.create(path, options).start();
  }

  constructor(
    public readonly path: string,
    private readonly handlers: FileWatchHandler[],
    private readonly watcher: Deno.FsWatcher = Deno.watchFs(path),
  ) {}

  async start() {
    for await (const event of this.watcher) {
      for (const handler of this.handlers) {
        await handler.handle(event);
      }
    }

    return this;
  }

  stop() {
    this.watcher.close();
  }
}
