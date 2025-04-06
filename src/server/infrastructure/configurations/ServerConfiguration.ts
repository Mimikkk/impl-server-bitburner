import { colors } from "@cliffy/ansi/colors";
import { Log } from "@shared/logging/log.ts";
import { HttpJsonResponseNs } from "../messaging/responses/HttpJsonResponseNs.ts";
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
    return HttpJsonResponseNs.internal(error);
  },
};
