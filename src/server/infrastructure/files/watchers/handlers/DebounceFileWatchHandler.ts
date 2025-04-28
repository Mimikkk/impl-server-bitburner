import { FileWatchHandle, FileWatchHandler } from "@server/infrastructure/files/watchers/handlers/FileWatchHandler.ts";

export class DebounceFileWatchHandler implements FileWatchHandler {
  static create({ onEvent, debounceMs = 200 }: {
    onEvent: (event: Deno.FsEvent) => void;
    debounceMs?: number;
  }) {
    return new DebounceFileWatchHandler(onEvent, debounceMs, new Map(), new Map());
  }

  private constructor(
    private readonly onEvent: FileWatchHandle,
    private readonly debounceMs: number,
    private readonly timeouts: Map<string, number>,
    private readonly events: Map<string, Deno.FsEvent>,
  ) {
  }

  handle(event: Deno.FsEvent) {
    const path = event.paths[0];
    this.events.set(path, event);

    if (this.timeouts.has(path)) {
      clearTimeout(this.timeouts.get(path));
    }

    const timeout = setTimeout(async () => {
      const event = this.events.get(path)!;
      await this.onEvent(event);

      this.timeouts.delete(path);
      this.events.delete(path);
    }, this.debounceMs);

    this.timeouts.set(path, timeout);
  }
}
