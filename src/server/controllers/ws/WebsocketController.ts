import { Command } from "@server/services/commands/commands.ts";
import { RpcJsonResponse } from "@server/messages/responses/RpcJsonResponse.ts";
import { Log } from "@shared/logging/log.ts";
import { CommandSocketService } from "@server/services/commands/CommandSocketService.ts";

export namespace WebsocketController {
  export const index = (request: Request) => {
    const { socket, response } = Deno.upgradeWebSocket(request);

    const queue = CommandSocketService.manage(socket);
    socket.addEventListener("open", () => {
      const request = Command.list({ server: "127.0.0.1" });

      queue.wait(request);

      socket.send(JSON.stringify(request));
    });

    socket.addEventListener("message", async (event) => {
      const response = JSON.parse(event.data) as RpcJsonResponse<unknown>;

      response.id;

      if (RpcJsonResponse.isError(response)) {
        Log.error("Failed with error", response.error);
      } else if (RpcJsonResponse.isOk(response)) {
        console.log("result", response.result);
      }
    });

    return response;
  };
}
