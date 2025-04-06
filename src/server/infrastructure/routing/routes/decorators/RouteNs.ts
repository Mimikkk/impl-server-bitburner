import { HttpMethod } from "@shared/enums/HttpMethod.ts";

export namespace RouteNs {
  const symbol = Symbol("RouteMetadata");
  export interface Meta {
    [symbol]: Spec;
  }

  export type Options =
    & { path: string }
    & (
      | { type: "ws" }
      | { method: HttpMethod; type: "http" }
    );

  export type Spec =
    & { path: string; name: string }
    & (
      | { type: "ws" }
      | { type: "http"; method: HttpMethod }
    );

  export const route = (options: Options) => (target: any, context: ClassMethodDecoratorContext) => {
    const meta = target as Meta;

    if (options.type === "ws") {
      meta[symbol] = {
        name: context.name as string,
        path: options.path,
        type: options.type,
      };
    } else {
      meta[symbol] = {
        name: context.name as string,
        path: options.path,
        type: options.type,
        method: options.method,
      };
    }
  };

  export const get = (path: string) => route({ path, method: HttpMethod.Get, type: "http" });
  export const post = (path: string) => route({ path, method: HttpMethod.Post, type: "http" });
  export const put = (path: string) => route({ path, method: HttpMethod.Put, type: "http" });
  export const del = (path: string) => route({ path, method: HttpMethod.Delete, type: "http" });
  export const patch = (path: string) => route({ path, method: HttpMethod.Patch, type: "http" });
  export const ws = (path: string) => route({ path, type: "ws" });

  export const is = (value: any): value is Meta => !!value[symbol];
  export const meta = (value: Meta): Spec => value[symbol];
}
