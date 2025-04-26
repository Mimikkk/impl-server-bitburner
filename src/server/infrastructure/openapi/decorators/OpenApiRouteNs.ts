import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { OpenApiResponseNs } from "@server/infrastructure/openapi/decorators/OpenApiResponseNs.ts";
import { RequestContent } from "@server/presentation/messaging/http/content/RequestContent.ts";
import { PathParameter } from "@server/presentation/messaging/http/parameters/PathParameter.ts";

export namespace OpenApiRouteNs {
  const symbol = Symbol("OpenapiRouteMeta");
  export interface Meta {
    [symbol]: Spec;
  }
  export const is = (value: any): value is Meta => Object.hasOwn(value, symbol);
  export const meta = (value: Meta): Spec => value[symbol];
  export const get = (value: any): Spec | undefined => is(value) ? meta(value) : undefined;

  export interface Spec {
    summary: string;
    description: string;
    tags: OpenApiTag[];
    responses: OpenApiResponseNs.Meta[];
    deprecated: boolean;
    parameters: PathParameter[];
    content?: RequestContent;
  }

  export interface Options {
    summary: string;
    description: string;
    tags: OpenApiTag[];
    responses?: OpenApiResponseNs.Meta[];
    deprecated?: boolean;
    parameters?: PathParameter[];
    content?: RequestContent;
  }

  export const decorate =
    ({ summary, description, tags, responses, deprecated, parameters, content }: Options) => (target: any) => {
      target[symbol] = {
        summary,
        description,
        tags,
        responses: responses ?? [],
        deprecated: deprecated ?? false,
        parameters: parameters ?? [],
        content,
      } satisfies Spec;
    };
}
