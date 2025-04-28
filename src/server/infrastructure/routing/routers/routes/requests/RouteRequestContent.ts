import { RequestContext } from "@server/infrastructure/routing/routers/requests/RequestContext.ts";

export class RouteRequestContent<P extends object | null> {
  static create<P extends Record<string, any>>(values: P): RouteRequestContent<P> {
    return new RouteRequestContent(values);
  }

  private constructor(
    public readonly values: P,
  ) {}

  static async fromRequestContext<P extends Record<string, any>>(
    request: RequestContext,
  ): Promise<RouteRequestContent<P>> {
    let values: P;
    try {
      values = request.original.body ? await request.original.json() : {};
    } catch {
      values = {} as P;
    }

    return RouteRequestContent.create(values);
  }
}
