import { colors } from "@cliffy/ansi/colors";
import { Log } from "@shared/logging/log.ts";
import { JsonHttpResponseCommon } from "@server/responses/JsonHttpResponseCommon.ts";
import { initializeWebSocket } from "@server/controllers/ws/initializeWebSocket.ts";
import { createInstructionResponse } from "@server/controllers/http/instruction.ts";

const ServerConfiguration: Deno.ServeTcpOptions = {
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
    return JsonHttpResponseCommon.internal(error);
  },
};

Deno.serve(ServerConfiguration, (request) => {
  console.log("request", request);
  if (request.headers.get("upgrade") === "websocket") {
    return initializeWebSocket(request);
  }

  return createInstructionResponse();
});
