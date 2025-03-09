import { TypeKey } from "@shared/types/typedKey.ts";
import { ControlFn } from "@server/routing/router/ControlFn.ts";

type PathSegmentLiteral = { type: "literal"; value: string };
type PathSegmentParameter = { type: "parameter" };
type PathSegment = PathSegmentLiteral | PathSegmentParameter;

const segmentize = (path: string): PathSegment[] =>
  path.split("/").map((segment) => {
    if (segment.startsWith("{") && segment.endsWith("}")) {
      return { type: "parameter" };
    }

    return { type: "literal", value: segment };
  });

export class Route<P extends `/${string}` = any, C = any, H extends TypeKey<C, ControlFn> = any> {
  static create = <P extends `/${string}`, C, H extends TypeKey<C, ControlFn>>(
    path: P,
    controller: C,
    handler: H,
  ) => new Route(path, controller, handler, segmentize(path));

  private constructor(
    public readonly path: P,
    public readonly controller: C,
    public readonly handler: H,
    public readonly segments: PathSegment[],
  ) {}
}
