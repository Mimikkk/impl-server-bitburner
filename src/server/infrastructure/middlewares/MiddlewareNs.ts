import { DispatchMiddleware } from "./DispatchMiddleware.ts";
import { FaviconRedirectMiddleware } from "./FaviconRedirectMiddleware.ts";
import { InternalBarrierMiddleware } from "./InternalBarrierMiddleware.ts";
import { RedirectMiddleware } from "./RedirectMiddleware.ts";
import { TimeoutMiddleware } from "./TimeoutMiddleware.ts";

export namespace MiddlewareNs {
  export const redirect = RedirectMiddleware.create;
  export const faviconRedirect = FaviconRedirectMiddleware.create;
  export const internalBarrier = InternalBarrierMiddleware.create;
  export const timeout = TimeoutMiddleware.create;
  export const dispatch = DispatchMiddleware.create;
}
