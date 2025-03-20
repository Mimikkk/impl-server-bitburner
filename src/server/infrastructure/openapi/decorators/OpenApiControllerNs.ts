export namespace OpenApiControllerNs {
  export interface Options {
    name: string;
    type: "http" | "ws";
  }

  export interface Spec {
    name: string;
    type: "http" | "ws";
  }

  export interface Controller extends Record<any, any> {
    openapi: Spec;
  }

  export const decorate = ({ name, type }: Options) => (target: any) => {
    target.openapi = { name, type } satisfies Spec;
  };

  export const is = (value: any): value is Controller => !!value.openapi;
}
