import { TypeKey } from "@shared/types/typedKey.ts";
import { ControlFn } from "@server/routing/router/ControlFn.ts";

export class Route<P extends `/${string}`, C, H extends TypeKey<C, ControlFn>> {
  static create = <P extends `/${string}`, C, H extends TypeKey<C, ControlFn>>(
    path: P,
    controller: C,
    handler: H,
  ) => new Route(path, controller, handler);

  private constructor(
    public readonly path: P,
    public readonly controller: C,
    public readonly handler: H,
  ) {}
}
