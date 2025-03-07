import { createHtmlResponse, HtmlResponseOptions } from "@server/responses/HtmlResponse.ts";

export namespace HtmlHttpResponse {
  export const success = (html: string, options?: HtmlResponseOptions) =>
    createHtmlResponse(html, HtmlResponseOptions.merge({ status: 200 }, options));
}
