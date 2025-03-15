import { RouteRequestContext } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestContext.ts";
import { Awaitable } from "@shared/types/common.ts";
import { TypeKey } from "@shared/types/typedKey.ts";

export type ControlFn = (context: RouteRequestContext<any>) => Awaitable<Response>;
export type ControlKey<C> = TypeKey<C, ControlFn>;
