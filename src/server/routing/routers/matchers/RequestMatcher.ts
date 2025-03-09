import { RequestContext } from "@server/routing/routers/requests/RequestContext.ts";

export interface RequestMatcher {
  matches(request: RequestContext): boolean;
}
