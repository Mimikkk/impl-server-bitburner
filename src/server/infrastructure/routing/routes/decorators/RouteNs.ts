import { HttpMethod } from "@shared/enums/HttpMethod.ts";

export namespace RouteNs {
  export interface Options {
    path: string;
    method: HttpMethod;
  }

  export interface Spec {
    path: string;
    method: HttpMethod;
    name: string;
  }

  export interface Route {
    route: Spec;
  }

  export const route = (options: Options) => (target: any, context: ClassMethodDecoratorContext) => {
    target.route = {
      path: options.path,
      method: options.method,
      name: context.name as string,
    } satisfies Spec;
  };

  export const get = (path: string) => route({ path, method: HttpMethod.Get });
  export const post = (path: string) => route({ path, method: HttpMethod.Post });
  export const put = (path: string) => route({ path, method: HttpMethod.Put });
  export const del = (path: string) => route({ path, method: HttpMethod.Delete });
  export const patch = (path: string) => route({ path, method: HttpMethod.Patch });
  export const is = (value: any): value is Route => !!value.route;
}
