export namespace OpenApiControllerNs {
  const symbol = Symbol("OpenapiControllerMeta");
  export interface Meta {
    [symbol]: Spec;
  }
  export const is = (value: any): value is Meta => Object.hasOwn(value, symbol);
  export const meta = (value: Meta): Spec => value[symbol];
  export const get = (value: any): Spec | undefined => is(value) ? meta(value) : undefined;

  export interface Spec {
    name: string;
  }

  export interface Options {
    name: string;
  }
  export const decorate = ({ name }: Options) => (target: any) => {
    target[symbol] = { name } satisfies Spec;
  };
}
