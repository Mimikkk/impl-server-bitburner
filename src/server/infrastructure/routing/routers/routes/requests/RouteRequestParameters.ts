import { RequestUrl } from "@server/infrastructure/routing/routers/requests/RequestUrl.ts";
import { RouteUrl } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";
import { RouteRequestPathParameterParser } from "@server/infrastructure/routing/routers/routes/requests/RouteRequestParameterParser.ts";

export class RouteRequestParameters<P extends Record<string, any>> {
  static create<P extends Record<string, any>>(values: P): RouteRequestParameters<P> {
    return new RouteRequestParameters(values);
  }

  private constructor(
    public readonly values: P,
  ) {}

  static fromUrls<P extends Record<string, any>>(
    { segments }: RouteUrl,
    { parts }: RequestUrl,
  ): RouteRequestParameters<P> {
    return RouteRequestParameters.create(
      RouteRequestPathParameterParser.fromSegmentsAndParts<P>(segments, parts),
    );
  }
}
