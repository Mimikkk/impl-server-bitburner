import { PathParameter } from "@server/presentation/messaging/http/parameters/PathParameter.ts";
import { HttpMethod } from "@server/shared/enums/HttpMethod.ts";

export namespace RouteNs {
  const symbol = Symbol("RouteMeta");
  export interface Meta {
    [symbol]: Spec;
  }

  export type Options =
    & { path: string | PathParameter }
    & (
      | { type: "ws" }
      | { method: HttpMethod; type: "http" }
    );

  export type Spec =
    & { path: string; name: string; self: Meta }
    & (
      | { type: "ws" }
      | { type: "http"; method: HttpMethod }
    );

  export const route = (options: Options) => (target: any, context: ClassMethodDecoratorContext) => {
    const meta = target as Meta;

    if (options.type === "ws") {
      meta[symbol] = {
        name: context.name as string,
        path: `${options.path}`,
        type: options.type,
        self: target,
      };
    } else {
      meta[symbol] = {
        name: context.name as string,
        path: `${options.path}`,
        type: options.type,
        method: options.method,
        self: target,
      };
    }
  };

  export const get = (path: string | PathParameter) => route({ path, method: HttpMethod.Get, type: "http" });
  export const post = (path: string | PathParameter) => route({ path, method: HttpMethod.Post, type: "http" });
  export const put = (path: string | PathParameter) => route({ path, method: HttpMethod.Put, type: "http" });
  export const del = (path: string | PathParameter) => route({ path, method: HttpMethod.Delete, type: "http" });
  export const patch = (path: string | PathParameter) => route({ path, method: HttpMethod.Patch, type: "http" });
  export const ws = (path: string | PathParameter) => route({ path, type: "ws" });

  export const is = (value: any): value is Meta => Object.hasOwn(value, symbol);
  export const meta = (value: Meta): Spec => value[symbol];
}
