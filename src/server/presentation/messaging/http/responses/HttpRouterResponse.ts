import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";

export namespace HttpRouterResponse {
  interface MissingParams {
    path: string;
    method: string;
  }

  export const [Missing, missing] = HttpJsonResponse.custom({
    content: ({ path, method }: MissingParams) => ({ message: "Route not found", path, method }),
    example: { message: "Route not found", path: "path/to/route", method: "GET" },
    name: "MissingRoute",
    description: "Route not found",
    schema: {
      type: "object",
      properties: {
        message: { type: "string" },
        path: { type: "string" },
        method: { type: "string" },
      },
      required: ["message", "path", "method"],
    },
    status: 501,
  });
}
