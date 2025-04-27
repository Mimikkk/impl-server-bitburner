import { BarrierMiddleware } from "./impls/BarrierMiddleware.ts";
import { RedirectMiddleware } from "./impls/RedirectMiddleware.ts";
import { RouteMiddleware } from "./impls/RouteMiddleware.ts";
import { TimeoutMiddleware } from "./impls/TimeoutMiddleware.ts";

export namespace MiddlewareNs {
  export const redirect = RedirectMiddleware.create;
  export const barrier = BarrierMiddleware.create;
  export const timeout = TimeoutMiddleware.create;
  export const routes = RouteMiddleware.create;
}
