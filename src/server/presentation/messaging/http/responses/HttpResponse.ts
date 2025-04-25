import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiResponseNs } from "@server/infrastructure/openapi/decorators/OpenApiResponseNs.ts";

export namespace HttpResponse {
  export interface CustomOptions<Fn extends (...args: any[]) => string> {
    content: Fn;
    headers: HeadersInit;
    spec: OpenApiResponseNs.Spec;
  }
}

export class HttpResponse {
  static create(content: BodyInit, status: number, headers: HeadersInit): HttpResponse {
    return new HttpResponse(new Response(content, { headers, status }));
  }

  private constructor(
    private readonly response: Response,
  ) {}

  static custom<const ContentFn extends (...args: any[]) => string>(
    { content, headers, spec }: HttpResponse.CustomOptions<ContentFn>,
  ) {
    const response = content instanceof Function ? content : () => content;

    @OpenApiNs.response(spec)
    class Class {
      static create(...params: Parameters<ContentFn>) {
        return new Class(HttpResponse.create(response(...params), spec.status, headers));
      }

      static toResponse(...params: Parameters<ContentFn>) {
        return Class.create(...params).toResponse();
      }

      private constructor(
        private readonly response: HttpResponse,
      ) {}

      toResponse(): Response {
        return this.response.toResponse();
      }
    }

    Object.defineProperty(Class, "name", { value: name, writable: false });

    return [Class, Class.toResponse] as [(typeof Class) & OpenApiResponseNs.Meta, typeof Class.toResponse];
  }

  toResponse(): Response {
    return this.response;
  }
}
