import { DebounceFileWatchHandler } from "@server/infrastructure/files/watchers/handlers/DebounceFileWatchHandler.ts";
import { CallbackFileWatchHandler } from "./handlers/CallbackFileWatchHandler.ts";

export namespace FileWatcherHandlers {
  export const debounce = DebounceFileWatchHandler.create;
  export const callback = CallbackFileWatchHandler.create;
}
