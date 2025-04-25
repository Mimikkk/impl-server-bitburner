import { PathParameter } from "@server/presentation/messaging/http/parameters/PathParameter.ts";

export namespace HttpStaticParameter {
  export const Path = PathParameter.string({
    name: "path",
    description: "The path to the static file",
    example: "favicon.ico",
  });
}
