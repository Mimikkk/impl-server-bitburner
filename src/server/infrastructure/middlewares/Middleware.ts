import { Awaitable } from "@shared/types/common.ts";

export type Dispatch = (request: Request) => Awaitable<Response>;
export interface Middleware {
  handle(request: Request, next: Dispatch): Awaitable<Response>;
}
