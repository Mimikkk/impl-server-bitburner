import { colors } from "@cliffy/ansi/colors";
import { Log } from "@shared/logging/log.ts";
import { HttpJsonResponseCommon } from "@server/messages/responses/HttpJsonResponse.common.ts";

export const ServerConfiguration: Deno.ServeTcpOptions = {
  port: 8080,
  hostname: "127.0.0.1",
  onListen({ hostname, port, transport }) {
    Log.info(
      `Server is running on ${colors.yellow(hostname)}:${colors.yellow(port.toString())} using ${
        colors.yellow(transport)
      }`,
    );
  },
  onError(error) {
    Log.error("Server failed to start:", error);
    return HttpJsonResponseCommon.internal(error);
  },
};
