import { Awaitable } from "@server/shared/types/common.ts";

export interface FileWatchHandler {
  handle(event: Deno.FsEvent): Awaitable<void>;
}

export type FileWatchHandle = (event: Deno.FsEvent) => Awaitable<void>;
