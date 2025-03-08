import { createHtmlResponse, HtmlResponseOptions } from "@server/messages/responses/HtmlResponse.ts";

export namespace HttpHtmlResponse {
  export const success = (html: string, options?: HtmlResponseOptions) =>
    createHtmlResponse(html, HtmlResponseOptions.merge({ status: 200 }, options));
}
