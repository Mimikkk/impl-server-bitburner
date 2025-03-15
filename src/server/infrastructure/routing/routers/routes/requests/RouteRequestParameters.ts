import { RequestUrl } from "@server/infrastructure/routing/routers/requests/RequestUrl.ts";
import { RouteSegment, RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";
import { RouteRequestParameterParser } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestParameterParser.ts";

export class RouteRequestParameters<P extends Record<string, any>> {
  static create<P extends Record<string, any>>(parameters: P): RouteRequestParameters<P> {
    return new RouteRequestParameters(parameters);
  }

  private constructor(
    public readonly values: P,
  ) {}

  static fromUrls<P extends Record<string, any>>(
    routeUrl: RouteUrl,
    requestUrl: RequestUrl,
  ): RouteRequestParameters<P> {
    const segments = routeUrl.segments;
    const parts = requestUrl.parts;

    const parameters: P = {} as P;

    for (let index = 0, it = segments.length; index < it; ++index) {
      const segment = segments[index];

      if (segment.variant !== RouteSegment.Variant.Parameter) continue;

      const value = RouteRequestParameterParser.parse(segment.type, parts[index]);

      parameters[segment.value as keyof P] = value as P[keyof P];
    }

    return RouteRequestParameters.create(parameters);
  }
}
