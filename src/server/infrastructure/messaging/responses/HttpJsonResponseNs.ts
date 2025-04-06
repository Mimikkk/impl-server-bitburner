import { HttpJsonResponse } from "./HttpJsonResponse.ts";

export namespace HttpJsonResponseNs {
  export const custom = HttpJsonResponse.custom;

  export const [Success, success] = HttpJsonResponse.custom({
    content: () => ({ message: "The request was successful", status: 200 }),
    example: { message: "The request was successful", status: 200 },
    name: "Success",
    description: "The request was successful",
    status: 200,
  });

  export const [Created, created] = HttpJsonResponse.custom({
    content: () => ({ message: "The resource was created successfully", status: 201 }),
    example: { message: "The resource was created successfully", status: 201 },
    name: "Created",
    description: "The resource was created successfully",
    status: 201,
  });

  export const [Failure, failure] = HttpJsonResponse.custom({
    content: () => ({ message: "The request was invalid", status: 400 }),
    example: { message: "The request was invalid", status: 400 },
    name: "Failure",
    description: "The request was invalid",
    status: 400,
  });

  export const [NotFound, notFound] = HttpJsonResponse.custom({
    content: () => ({ message: "The resource was not found", status: 404 }),
    example: { message: "The resource was not found", status: 404 },
    name: "NotFound",
    description: "The resource was not found",
    status: 404,
  });

  export const [Unknown, unknown] = HttpJsonResponse.custom({
    content: () => ({ message: "An unknown error occurred", status: 500 }),
    example: { message: "An unknown error occurred", status: 500 },
    name: "Unknown",
    description: "An unknown error occurred",
    status: 500,
  });

  export const [Unimplemented, unimplemented] = HttpJsonResponse.custom({
    content: () => ({ message: "The request is not implemented", status: 501 }),
    example: { message: "The request is not implemented", status: 501 },
    name: "Unimplemented",
    description: "The request is not implemented",
    status: 501,
  });

  export const [Unavailable, unavailable] = HttpJsonResponse.custom({
    content: () => ({ message: "The service is unavailable", status: 503 }),
    example: { message: "The service is unavailable", status: 503 },
    name: "Unavailable",
    description: "The service is unavailable",
    status: 503,
  });

  export const [Internal, internal] = HttpJsonResponse.custom({
    content: (error: unknown) => ({ message: "Internal Server Error", status: 500, error }),
    example: { message: "Internal Server Error", status: 500, error: "Unknown error" },
    name: "Internal",
    description: "Internal Server Error",
    status: 500,
  });

  interface NoFileParams {
    path: string;
  }

  export const [NoFile, noFile] = HttpJsonResponse.custom({
    content: ({ path }: NoFileParams) => ({ message: "File not found", path }),
    example: { message: "File not found", path: "path/to/file" },
    name: "NoFile",
    description: "File not found",
    status: 404,
  });

  interface NorouteParams {
    path: string;
    method: string;
  }

  export const [NoRoute, noRoute] = HttpJsonResponse.custom({
    content: ({ path, method }: NorouteParams) => ({ message: "Route not found", path, method }),
    example: { message: "Route not found", path: "path/to/route", method: "GET" },
    name: "Noroute",
    description: "Route not found",
    status: 501,
  });
}
