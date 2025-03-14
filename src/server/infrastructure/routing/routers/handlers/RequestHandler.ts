import { Awaitable } from "@shared/types/common.ts";
import { RouteRequestContext } from "../routes/requests/RouteRequestContext.ts";

export interface RequestHandler {
  handle(request: Request, context: RouteRequestContext): Awaitable<Response>;
}
