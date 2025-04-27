import { FaviconRedirectMiddleware } from "./impls/FaviconRedirectMiddleware.ts";
import { InternalBarrierMiddleware } from "./impls/InternalBarrierMiddleware.ts";
import { RedirectMiddleware } from "./impls/RedirectMiddleware.ts";
import { RouteMiddleware } from "./impls/RouteMiddleware.ts";
import { TimeoutMiddleware } from "./impls/TimeoutMiddleware.ts";

export namespace MiddlewareNs {
  export const redirect = RedirectMiddleware.create;
  export const faviconRedirect = FaviconRedirectMiddleware.create;
  export const internalBarrier = InternalBarrierMiddleware.create;
  export const timeout = TimeoutMiddleware.create;
  export const routes = RouteMiddleware.create;
}
