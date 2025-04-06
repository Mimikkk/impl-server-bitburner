import { HttpResponse } from "@server/infrastructure/messaging/responses/HttpResponse.ts";
import { IResponse } from "@server/infrastructure/messaging/responses/IResponse.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";

export class HttpJsonResponse implements IResponse {
  static headers = { "Content-Type": "application/json" };

  static create<T>(content: T, status: number): HttpJsonResponse {
    return new HttpJsonResponse(
      HttpResponse.create(JSON.stringify(content), status, HttpJsonResponse.headers),
    );
  }

  static custom<const Fn extends (...args: any[]) => any>({
    content,
    example,
    name,
    description,
    status,
  }: {
    name: string;
    description: string;
    content: Fn;
    example: ReturnType<Fn>;
    status: number;
  }) {
    @OpenApiNs.response({
      status,
      description,
      content: { "application/json": { schema: { type: "object" }, example } },
    })
    class Class implements IResponse {
      static create(...params: Parameters<Fn>) {
        return new Class(HttpJsonResponse.create(content(...params), status));
      }
      static toResponse(...params: Parameters<Fn>) {
        return Class.create(...params).toResponse();
      }

      private constructor(
        private readonly response: HttpJsonResponse,
      ) {}

      toResponse(): Response {
        return this.response.toResponse();
      }
    }

    Object.defineProperty(Class, "name", { value: name, writable: false });

    return [Class, Class.toResponse] as const;
  }

  private constructor(
    private readonly response: HttpResponse,
  ) {}

  toResponse(): Response {
    return this.response.toResponse();
  }
}
