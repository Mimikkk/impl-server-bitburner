import { HtmlSuccessResponse } from "@server/infrastructure/messaging/responses/HtmlResponse.ts";

export namespace HttpHtmlResponse {
  export const success = (html: string) => HtmlSuccessResponse.create(html).toResponse();
}
