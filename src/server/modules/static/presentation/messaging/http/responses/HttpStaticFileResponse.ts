import { StaticFile } from "@server/modules/static/domain/StaticFile.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";

export namespace HttpStaticFileResponse {
  export const content = <F extends StaticFile>(file: F) =>
    new Response(file.content, { headers: { "Content-Type": file.mime } });

  interface NoFileParams {
    path: string;
  }

  export const [Missing, missing] = HttpJsonResponse.custom({
    content: ({ path }: NoFileParams) => ({ message: "File not found", path }),
    example: { message: "File not found", path: "path/to/file" },
    schema: { type: "object", properties: { message: { type: "string" }, path: { type: "string" } } },
    name: "NoFile",
    description: "File not found",
    status: 404,
  });
}
