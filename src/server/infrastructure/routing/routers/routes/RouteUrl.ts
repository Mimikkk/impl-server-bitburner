export type ParameterType = "number" | "string" | "integer";

export class RouteSegment {
  static create(part: string, value: string, variant: RouteSegment.Variant, type: ParameterType): RouteSegment {
    return new RouteSegment(part, value, variant, type);
  }

  private constructor(
    public readonly part: string,
    public readonly value: string,
    public readonly variant: RouteSegment.Variant,
    public readonly type: ParameterType,
  ) {}

  static literal(part: string): RouteSegment {
    return RouteSegment.create(part, part, RouteSegment.Variant.Literal, "string");
  }

  static parameter(part: string, value: string, type: ParameterType): RouteSegment {
    return RouteSegment.create(part, value, RouteSegment.Variant.Parameter, type);
  }

  static fromUrlPart(part: string): RouteSegment {
    if (part.startsWith("{") && part.endsWith("}")) {
      const [value, type] = part.substring(1, part.length - 1).split(":");
      return RouteSegment.parameter(part, value, (type ?? "string") as ParameterType);
    }

    return RouteSegment.literal(part);
  }
}

export namespace RouteSegment {
  export enum Variant {
    Literal = "literal",
    Parameter = "parameter",
  }
}

export class RouteUrl {
  static create(pathname: string, segments: RouteSegment[]): RouteUrl {
    return new RouteUrl(pathname, segments);
  }

  private constructor(
    public readonly pathname: string,
    public readonly segments: RouteSegment[],
  ) {}

  static fromRoutePath(path: string): RouteUrl {
    const pathname = path.trim().replace(/\/$/, "");
    const segments = pathname.split("/").filter(Boolean).map(RouteSegment.fromUrlPart);

    return RouteUrl.create(pathname, segments);
  }
}
