import { JsonHttpResponse } from "@server/responses/JsonHttpResponse.ts";

export namespace JsonHttpResponseCommon {
  export const internal = (error: unknown) =>
    JsonHttpResponse.unknown({
      message: "Internal Server Error",
      error,
    });

  interface MissingFile {
    path: string;
  }

  export const nofile = ({ path }: MissingFile) =>
    JsonHttpResponse.unknown({
      message: "File not found",
      path,
    });
}
