import { ParameterType, RouteSegment } from "@server/infrastructure/routing/routers/routes/RouteUrl.ts";

export class RouteRequestPathParameterParser {
  static instance = RouteRequestPathParameterParser.create();

  static create() {
    return new RouteRequestPathParameterParser();
  }

  private constructor() {}

  static fromSegmentsAndParts<P extends Record<string, any>>(segments: any[], parts: any[]): P {
    return this.instance.fromSegmentsAndParts(segments, parts);
  }

  fromSegmentsAndParts<P extends Record<string, any>>(segments: any[], parts: any[]): P {
    const result: P = {} as P;

    for (let index = 0, it = segments.length; index < it; ++index) {
      const segment = segments[index];

      if (segment.variant !== RouteSegment.Variant.Parameter) continue;

      const value = this.parseValue(segment.type, parts[index]);

      result[segment.value as keyof P] = value as P[keyof P];
    }

    return result;
  }

  parseValue(type: ParameterType, value: string): any {
    if (type === "number" || type === "integer") {
      return +value;
    }

    return value;
  }
}
