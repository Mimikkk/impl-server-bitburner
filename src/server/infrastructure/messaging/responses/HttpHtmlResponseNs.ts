import { HttpHtmlResponse } from "@server/infrastructure/messaging/responses/HtmlResponse.ts";

export namespace HttpHtmlResponseNs {
  export const custom = HttpHtmlResponse.custom;

  export const [Data, data] = HttpHtmlResponse.custom({
    content: (content: string) => content,
    example: `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Success</title>
      </head>
      <body>
        <h1>Success</h1>
      </body>
    </html>
    `,
    name: "Arbitrary HTML response",
    description: "Arbitrary HTML response",
    status: 200,
  });
}
