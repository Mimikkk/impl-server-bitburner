import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";

export interface IResponse {
  toResponse(): Response;
}

export class HtmlResponse implements IResponse {
  static create(body: string, status: number) {
    return new HtmlResponse(body, status);
  }

  private constructor(
    private readonly html: string,
    private readonly status: number,
  ) {}

  toResponse(): Response {
    return new Response(this.html, {
      headers: { "Content-Type": "text/html" },
      status: this.status,
    });
  }
}

@OpenApiNs.response({
  status: 200,
  description: "OK",
  content: { "text/html": { schema: { type: "string" } } },
})
export class HtmlSuccessResponse implements IResponse {
  static create(html: string) {
    return new HtmlSuccessResponse(HtmlResponse.create(html, 200));
  }

  private constructor(
    private readonly response: HtmlResponse,
  ) {}

  toResponse(): Response {
    return this.response.toResponse();
  }
}
