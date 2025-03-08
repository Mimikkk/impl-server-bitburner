import { colors } from "@cliffy/ansi/colors";
import { Log } from "@shared/logging/log.ts";
import { HttpJsonResponseCommon } from "@server/messages/responses/HttpJsonResponse.common.ts";

const port = parseInt(Deno.env.get("SERVER_PORT") ?? "8080");
const hostname = Deno.env.get("SERVER_HOST") ?? "127.0.0.1";

export const ServerConfiguration: Deno.ServeTcpOptions = {
  port,
  hostname,
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
