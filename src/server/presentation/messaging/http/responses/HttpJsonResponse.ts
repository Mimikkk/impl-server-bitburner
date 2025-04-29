import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { HttpResponse } from "@server/presentation/messaging/http/responses/HttpResponse.ts";
import { SchemaObject } from "openapi3-ts/oas31";

export namespace HttpJsonResponse {
  export const headers = { "Content-Type": "application/json" } as const;

  export interface CustomOptions<Fn extends (...args: any[]) => any> {
    content: Fn;
    example: ReturnType<Fn>;
    name: string;
    status: number;
    description: string;
    schema: SchemaObject;
  }

  export const custom = <const Fn extends (...args: any[]) => any>({
    content,
    example,
    description,
    schema,
    status,
  }: CustomOptions<Fn>) =>
    HttpResponse.custom({
      content: (...params: Parameters<Fn>) => JSON.stringify(content(...params)),
      headers,
      spec: { status, description, content: { "application/json": { schema, example } } },
    });

  export interface ContentOptions<Fn extends (...args: any[]) => any>
    extends Omit<CustomOptions<Fn>, "status" | "content"> {
  }

  const createContent = <C>(content: C) => content;
  export const content = <C>(
    options: ContentOptions<() => C>,
  ) =>
    custom({
      content: createContent<C>,
      example: options.example,
      name: options.name,
      description: options.description,
      schema: options.schema,
      status: 200,
    });

  export const [Shapeless, shapeless] = content({
    example: { message: "this is a response of unknown shape" } as any,
    name: "Shapeless",
    description: "A response of unknown shape",
    schema: { type: "object", properties: { message: { type: "string" } } },
  });

  export const [Success, success] = custom({
    content: () => ({ message: "The request was successful", status: 200 }),
    example: { message: "The request was successful", status: 200 },
    name: "Success",
    description: "The request was successful",
    schema: { type: "object", properties: { message: { type: "string" }, status: { type: "number" } } },
    status: 200,
  });

  export const [Created, created] = custom({
    content: () => ({ message: "The resource was created successfully", status: 201 }),
    example: { message: "The resource was created successfully", status: 201 },
    name: "Created",
    description: "The resource was created successfully",
    schema: { type: "object", properties: { message: { type: "string" }, status: { type: "number" } } },
    status: 201,
  });

  export const [Failure, failure] = custom({
    content: () => ({ message: "The request was invalid", status: 400 }),
    example: { message: "The request was invalid", status: 400 },
    name: "Failure",
    description: "The request was invalid",
    schema: { type: "object", properties: { message: { type: "string" }, status: { type: "number" } } },
    status: 400,
  });

  export const [Validation, validation] = custom({
    content: (errors: ValidationError[]) => ({ errors }),
    example: {
      errors: [
        {
          field: "field",
          path: "path",
          messages: ["error 1", "error 2"],
        },
      ],
    },
    name: "Validation errors",
    description: "Validation errors",
    schema: { type: "object", properties: { errors: { type: "array", items: { type: "string" } } } },
    status: 400,
  });

  export const [Missing, missing] = custom({
    content: () => ({ message: "The resource was not found", status: 404 }),
    example: { message: "The resource was not found", status: 404 },
    name: "NotFound",
    description: "The resource was not found",
    schema: { type: "object", properties: { message: { type: "string" }, status: { type: "number" } } },
    status: 404,
  });

  export const [Unknown, unknown] = custom({
    content: () => ({ message: "An unknown error occurred", status: 500 }),
    example: { message: "An unknown error occurred", status: 500 },
    name: "Unknown",
    description: "An unknown error occurred",
    schema: { type: "object", properties: { message: { type: "string" }, status: { type: "number" } } },
    status: 500,
  });

  export const [Unimplemented, unimplemented] = custom({
    content: () => ({ message: "The request is not implemented", status: 501 }),
    example: { message: "The request is not implemented", status: 501 },
    name: "Unimplemented",
    description: "The request is not implemented",
    schema: { type: "object", properties: { message: { type: "string" }, status: { type: "number" } } },
    status: 501,
  });

  export const [Unavailable, unavailable] = custom({
    content: () => ({ message: "The service is unavailable", status: 503 }),
    example: { message: "The service is unavailable", status: 503 },
    name: "Unavailable",
    description: "The service is unavailable",
    schema: { type: "object", properties: { message: { type: "string" }, status: { type: "number" } } },
    status: 503,
  });

  export const [Internal, internal] = custom({
    content: (error: unknown) => ({ message: "Internal server error", status: 500, error: (error as Error)?.message }),
    example: { message: "Internal server error", status: 500, error: "Unknown error" },
    name: "Internal",
    description: "Internal server error",
    schema: { type: "object", properties: { error: { type: "string" } } },
    status: 500,
  });

  export const [Timeout, timeout] = custom({
    content: () => ({ message: "Request timeout", status: 504 }),
    example: { message: "Request timeout", status: 504 },
    name: "Timeout",
    description: "Request timeout",
    schema: { type: "object", properties: { message: { type: "string" }, status: { type: "number" } } },
    status: 504,
  });

  export const fromBoolean = (value: boolean) => value ? success() : failure();
}
