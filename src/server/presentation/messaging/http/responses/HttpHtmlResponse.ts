import { HttpResponse } from "@server/presentation/messaging/http/responses/HttpResponse.ts";
import { Str } from "@server/shared/utils/strings.ts";
import { SchemaObject } from "openapi3-ts/oas31";

export namespace HttpHtmlResponse {
  export const headers = { "Content-Type": "text/html" } satisfies HeadersInit;
  export const schema = { type: "string", format: "html-text" } satisfies SchemaObject;

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
    example: Str.trimlines`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Content title</title>
      </head>
      <body>
        Content body
      </body>
    </html>
    `,
    name: "Html content",
    description: "HTML content response",
    status: 200,
  });
}
