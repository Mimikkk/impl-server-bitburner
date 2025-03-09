export class RouteSegment {
  static create(part: string, value: string, type: RouteSegment.Type): RouteSegment {
    return new RouteSegment(part, value, type);
  }

  private constructor(
    public readonly part: string,
    public readonly value: string,
    public readonly type: RouteSegment.Type,
  ) {}

  static literal(part: string): RouteSegment {
    return RouteSegment.create(part, part, RouteSegment.Type.Literal);
  }

  static parameter(part: string): RouteSegment {
    return RouteSegment.create(part, part.substring(1, part.length - 1), RouteSegment.Type.Parameter);
  }

  static fromUrlPart(part: string): RouteSegment {
    if (part.startsWith("{") && part.endsWith("}")) {
      return RouteSegment.parameter(part);
    }

    return RouteSegment.literal(part);
  }
}

export namespace RouteSegment {
  export enum Type {
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
