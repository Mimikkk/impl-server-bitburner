import { colors } from "@cliffy/ansi/colors";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/http/HttpJsonResponse.ts";
import { Log } from "@shared/logging/log.ts";
import { EnvironmentConfiguration } from "./EnvironmentConfiguration.ts";

export const ServerConfiguration: Deno.ServeTcpOptions = {
  port: EnvironmentConfiguration.port,
  hostname: EnvironmentConfiguration.hostname,
  onListen({ hostname, port, transport }) {
    Log.info(
      `Server is running on ${colors.yellow(hostname)}:${colors.yellow(port.toString())} using ${
        colors.yellow(transport)
      }`,
    );
  },
  onError(error) {
    Log.error("Server failed to start:", error);
    return HttpJsonResponse.internal(error);
  },
};
