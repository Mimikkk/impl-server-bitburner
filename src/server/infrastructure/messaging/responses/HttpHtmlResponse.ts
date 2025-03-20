import { HtmlResponse, HtmlResponseOptions } from "./HtmlResponse.ts";

export namespace HttpHtmlResponse {
  export const success = (html: string, options?: HtmlResponseOptions) =>
    HtmlResponse.create(html, HtmlResponseOptions.merge({ status: 200 }, options)).toResponse();
}
