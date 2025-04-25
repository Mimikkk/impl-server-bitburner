import { ContentObject } from "openapi3-ts/oas31";

export namespace OpenApiResponseNs {
  const symbol = Symbol("OpenapiResponseMeta");
  export interface Meta {
    [symbol]: Spec;
  }
  export const is = (value: any): value is Meta => Object.hasOwn(value, symbol);
  export const meta = (value: Meta): Spec => value[symbol];
  export const get = (value: any): Spec | undefined => is(value) ? meta(value) : undefined;

  export interface Spec {
    status: number;
    description: string;
    content: ContentObject;
  }

  export interface Options {
    status: number;
    description: string;
    content: ContentObject;
  }

  export const decorate = ({ status, description, content }: Options) => (target: any) => {
    target[symbol] = {
      status,
      description,
      content,
    } satisfies Spec;
  };
}
