import { RouteSegment, RouteUrl } from "../RouteUrl.ts";
import { RequestUrl } from "../../requests/RequestUrl.ts";

export class RouteRequestParameters {
  static create(parameters: string[]): RouteRequestParameters {
    return new RouteRequestParameters(parameters);
  }

  private constructor(
    public readonly values: string[],
  ) {}

  static fromUrls(routeUrl: RouteUrl, requestUrl: RequestUrl): RouteRequestParameters {
    const segments = routeUrl.segments;
    const parts = requestUrl.parts;

    const parameters: string[] = [];

    for (let index = 0, it = segments.length; index < it; index++) {
      const segment = segments[index];

      if (segment.type === RouteSegment.Type.Parameter) {
        parameters.push(parts[index]);
      }
    }

    return RouteRequestParameters.create(parameters);
  }
}
