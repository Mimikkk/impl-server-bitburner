import { Nil } from "@shared/types/common.ts";

export interface JsonResourceOptions {}

export namespace JsonResourceOptions {
  export const merge = (a: Nil<JsonResourceOptions>, b: Nil<JsonResourceOptions>) => ({});
}

export const createJsonResource = <T>(data: T, _options?: JsonResourceOptions) => JSON.stringify(data);
