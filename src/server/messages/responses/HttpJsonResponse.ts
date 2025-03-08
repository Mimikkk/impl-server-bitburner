import { createJsonResponse, JsonResponseOptions } from "@server/messages/responses/JsonResponse.ts";

export namespace HttpJsonResponse {
  export const success = <T>(data: T, options?: JsonResponseOptions) =>
    createJsonResponse(data, JsonResponseOptions.merge({ status: 200 }, options));

  export const created = <T>(data: T, options?: JsonResponseOptions) =>
    createJsonResponse(data, JsonResponseOptions.merge({ status: 201 }, options));

  export const invalid = <T>(data: T, options?: JsonResponseOptions) =>
    createJsonResponse(data, JsonResponseOptions.merge({ status: 400 }, options));

  export const missing = <T>(data: T, options?: JsonResponseOptions) =>
    createJsonResponse(data, JsonResponseOptions.merge({ status: 404 }, options));

  export const unknown = <T>(data: T, options?: JsonResponseOptions) =>
    createJsonResponse(data, JsonResponseOptions.merge({ status: 500 }, options));

  export const unimplemented = <T>(data: T, options?: JsonResponseOptions) =>
    createJsonResponse(data, JsonResponseOptions.merge({ status: 501 }, options));

  export const unavailable = <T>(data: T, options?: JsonResponseOptions) =>
    createJsonResponse(data, JsonResponseOptions.merge({ status: 503 }, options));
}
