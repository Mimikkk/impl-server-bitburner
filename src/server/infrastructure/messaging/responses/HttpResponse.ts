import { IResponse } from "@server/infrastructure/messaging/responses/IResponse.ts";

export class HttpResponse implements IResponse {
  static create(content: BodyInit, status: number, headers: HeadersInit): HttpResponse {
    return new HttpResponse(new Response(content, { headers, status }));
  }

  private constructor(
    private readonly response: Response,
  ) {}

  toResponse(): Response {
    return this.response;
  }
}
