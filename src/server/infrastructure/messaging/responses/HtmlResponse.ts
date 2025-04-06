import { HttpResponse } from "@server/infrastructure/messaging/responses/HttpResponse.ts";
import { IResponse } from "@server/infrastructure/messaging/responses/IResponse.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";

export class HttpHtmlResponse implements IResponse {
  static headers = { "Content-Type": "text/html" };

  static create(content: string, status: number): HttpHtmlResponse {
    return new HttpHtmlResponse(HttpResponse.create(content, status, HttpHtmlResponse.headers));
  }

  static custom<const Fn extends (...args: any[]) => string>({
    content,
    example,
    name,
    description,
    status,
  }: {
    content: Fn;
    example: string;
    name: string;
    description: string;
    status: number;
  }) {
    const response = content instanceof Function ? content : () => content;

    @OpenApiNs.response({
      status,
      description,
      content: { "text/html": { schema: { type: "string" }, example } },
    })
    class Class implements IResponse {
      static create(...params: Parameters<Fn>) {
        return new Class(HttpHtmlResponse.create(response(...params), status));
      }

      static toResponse(...params: Parameters<Fn>) {
        return Class.create(...params).toResponse();
      }

      private constructor(
        private readonly response: HttpHtmlResponse,
      ) {}

      toResponse(): Response {
        return this.response.toResponse();
      }
    }

    Object.defineProperty(Class, "name", { value: name, writable: false });

    return [Class, Class.toResponse] as const;
  }

  static toResponse(content: string, status: number): Response {
    return HttpHtmlResponse.create(content, status).toResponse();
  }

  private constructor(
    private readonly response: HttpResponse,
  ) {}

  toResponse(): Response {
    return this.response.toResponse();
  }
}
