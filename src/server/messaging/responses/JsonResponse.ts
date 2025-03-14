import { createJsonResource, JsonResourceOptions } from "@server/infrastructure/messaging/resources/JsonResource.ts";
import { Nil } from "@shared/types/common.ts";

export interface JsonResponseOptions {
  resource?: JsonResourceOptions;
  status: number;
}

export namespace JsonResponseOptions {
  export const merge = (a: JsonResponseOptions, b: Nil<JsonResponseOptions>): JsonResponseOptions => ({
    resource: JsonResourceOptions.merge(a?.resource, b?.resource),
    status: b?.status ?? a?.status,
  });
}

export const createJsonResponse = <T>(data: T, _options?: JsonResponseOptions) =>
  new Response(
    createJsonResource(data, _options?.resource),
    {
      headers: { "Content-Type": "application/json" },
      status: _options?.status,
    },
  );
