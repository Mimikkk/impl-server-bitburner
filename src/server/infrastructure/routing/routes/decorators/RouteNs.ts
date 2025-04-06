import { HttpMethod } from "@shared/enums/HttpMethod.ts";

export namespace RouteNs {
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

  export interface Route {
    route: Spec;
  }

  export const route = (options: Options) => (target: any, context: ClassMethodDecoratorContext) => {
    if (options.type === "ws") {
      target.route = {
        type: options.type,
        path: options.path,
        name: context.name as string,
      } satisfies Spec;
    } else {
      target.route = {
        type: options.type,
        method: options.method,
        path: options.path,
        name: context.name as string,
      } satisfies Spec;
    }
  };

  export const get = (path: string) => route({ path, method: HttpMethod.Get, type: "http" });
  export const post = (path: string) => route({ path, method: HttpMethod.Post, type: "http" });
  export const put = (path: string) => route({ path, method: HttpMethod.Put, type: "http" });
  export const del = (path: string) => route({ path, method: HttpMethod.Delete, type: "http" });
  export const patch = (path: string) => route({ path, method: HttpMethod.Patch, type: "http" });
  export const is = (value: any): value is Route => !!value.route;

  export const ws = (path: string) => route({ path, type: "ws" });
}
