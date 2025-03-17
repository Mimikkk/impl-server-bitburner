import { Nil } from "@shared/types/common.ts";

export interface JsonResponseOptions {
  status: number;
}

export namespace JsonResponseOptions {
  export const merge = (a: JsonResponseOptions, b: Nil<JsonResponseOptions>): JsonResponseOptions => ({
    status: b?.status ?? a?.status,
  });
}

export const createJsonResponse = <T>(data: T, _options?: JsonResponseOptions) =>
  new Response(
    JSON.stringify(data),
    {
      headers: { "Content-Type": "application/json" },
      status: _options?.status,
    },
  );
