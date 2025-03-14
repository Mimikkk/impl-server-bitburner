import { RequestContext } from "../requests/RequestContext.ts";

export interface RequestMatcher {
  matches(request: RequestContext): boolean;
}
