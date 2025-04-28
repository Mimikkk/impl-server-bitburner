import { FileWatchHandle, FileWatchHandler } from "@server/infrastructure/files/watchers/handlers/FileWatchHandler.ts";

export interface CallbackFileWatchHandlerOptions {
  onEvent: FileWatchHandle;
}

export class CallbackFileWatchHandler implements FileWatchHandler {
  static create({ onEvent }: CallbackFileWatchHandlerOptions) {
    return new CallbackFileWatchHandler(onEvent);
  }

  private constructor(
    public readonly handle: FileWatchHandle,
  ) {}
}
