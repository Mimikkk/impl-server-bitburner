import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";

export namespace OpenApiRouteNs {
  export interface Options {
    summary: string;
    description: string;
    tags: OpenApiTag[];
    responses: Record<string, unknown>;
    deprecated?: boolean;
  }

  export interface Spec {
    summary: string;
    description: string;
    tags: OpenApiTag[];
    responses: Record<string, unknown>;
    deprecated: boolean;
  }

  export interface Route extends Record<any, any> {
    openapi: Spec;
  }

  export const decorate = ({ summary, description, tags, responses, deprecated }: Options) => (target: any) => {
    target.openapi = {
      summary,
      description,
      tags,
      responses,
      deprecated: deprecated ?? false,
    } satisfies Spec;
  };

  export const is = (value: any): value is Route => !!value.openapi;
}
