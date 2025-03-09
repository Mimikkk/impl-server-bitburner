import { RequestContext } from "@server/routing/routers/requests/RequestContext.ts";
import { HttpMethod } from "@shared/enums/HttpMethod.enum.ts";
import { RequestMatcher } from "@server/routing/routers/matchers/RequestMatcher.ts";

export class RequestMethodMatcher implements RequestMatcher {
  static create(method: HttpMethod): RequestMethodMatcher {
    return new RequestMethodMatcher(method);
  }

  private constructor(public readonly method: HttpMethod) {}

  matches(request: RequestContext): boolean {
    return request.method === this.method;
  }
}
