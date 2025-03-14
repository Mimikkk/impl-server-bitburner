import { colors } from "@cliffy/ansi/colors";
import { Environment } from "@server/environment.ts";
import { HttpJsonResponseCommon } from "@server/infrastructure/messaging/responses/HttpJsonResponse.common.ts";
import { Log } from "@shared/logging/log.ts";

export const ServerConfiguration: Deno.ServeTcpOptions = {
  port: Environment.port,
  hostname: Environment.hostname,
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
