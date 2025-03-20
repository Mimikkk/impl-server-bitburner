export namespace OpenApiResponseNs {
  export interface Options {
    status: number;
    description: string;
    content: Record<string, unknown>;
  }

  export interface Spec {
    status: number;
    description: string;
    content: Record<string, unknown>;
  }

  export interface Response extends Record<any, any> {
    openapi: Spec;
  }

  export const decorate = ({ status, description, content }: Options) => (target: any) => {
    target.openapi = { status, description, content } satisfies Spec;
  };

  export const is = (value: any): value is Response => !!value.openapi;
}
