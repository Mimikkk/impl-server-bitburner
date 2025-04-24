import { HttpResponse } from "@server/infrastructure/messaging/http/responses/HttpResponse.ts";

export namespace HttpHtmlResponse {
  export const headers = { "Content-Type": "text/html" } as const;
  export const schema = { type: "string" } as const;

  export interface CustomOptions<Fn extends (...args: any[]) => string> {
    content: Fn;
    example: string;
    name: string;
    description: string;
    status: number;
  }

  export const custom = <const Fn extends (...args: any[]) => string>({
    content,
    example,
    description,
    status,
  }: CustomOptions<Fn>) =>
    HttpResponse.custom({
      content,
      headers,
      spec: { status, description, content: { "text/html": { schema, example } } },
    });

  export const [Content, content] = custom({
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
    name: "Html content",
    description: "HTML content response",
    status: 200,
  });
}
