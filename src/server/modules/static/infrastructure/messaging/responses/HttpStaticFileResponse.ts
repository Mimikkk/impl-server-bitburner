import { HttpJsonResponseCommon } from "@server/infrastructure/messaging/responses/HttpJsonResponseCommon.ts";
import { StaticFile } from "../../../domain/StaticFile.ts";

export namespace HttpStaticFileResponse {
  export const found = <F extends StaticFile>(file: F) =>
    new Response(file.content, { headers: { "Content-Type": file.mime } });

  export const missing = (path: string) => HttpJsonResponseCommon.nofile({ path });
}
