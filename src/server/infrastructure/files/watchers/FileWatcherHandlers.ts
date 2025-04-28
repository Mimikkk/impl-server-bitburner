import { DebounceFileWatchHandler } from "@server/infrastructure/files/watchers/handlers/DebounceFileWatchHandler.ts";

export namespace FileWatcherHandlers {
  export const debounce = DebounceFileWatchHandler.create;
}
