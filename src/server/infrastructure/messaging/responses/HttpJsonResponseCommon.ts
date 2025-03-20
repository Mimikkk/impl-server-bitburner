import { HttpJsonResponse } from "./HttpJsonResponse.ts";

export namespace HttpJsonResponseCommon {
  export const internal = (error: unknown) =>
    HttpJsonResponse.unknown({
      message: "Internal Server Error",
      error,
    });

  interface NofileParams {
    path: string;
  }

  export const nofile = ({ path }: NofileParams) => HttpJsonResponse.unknown({ message: "File not found", path });

  interface NorouteParams {
    path: string;
    method: string;
  }

  export const noroute = ({ path, method }: NorouteParams) =>
    HttpJsonResponse.unimplemented({ message: "Route not found", path, method });
}
