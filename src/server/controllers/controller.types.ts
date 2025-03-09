import { TypeKey } from "@shared/types/typedKey.ts";
import { RouteRequestContext } from "@server/routing/routers/routes/requests/RouteRequestContext.ts";

export type ControlFn = (request: Request, context: RouteRequestContext) => Promise<Response> | Response;
export type ControlKey<C> = TypeKey<C, ControlFn>;
