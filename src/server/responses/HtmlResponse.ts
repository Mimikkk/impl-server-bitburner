import { Nil } from "@shared/types/common.ts";

export interface HtmlResponseOptions {
  status: number;
}

export namespace HtmlResponseOptions {
  export const merge = (a: HtmlResponseOptions, b: Nil<HtmlResponseOptions>): HtmlResponseOptions => ({
    status: b?.status ?? a?.status,
  });
}

export const createHtmlResponse = (html: string, _options?: HtmlResponseOptions) =>
  new Response(
    html,
    {
      headers: { "Content-Type": "text/html" },
      status: _options?.status,
    },
  );
