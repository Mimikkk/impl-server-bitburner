import { HttpJsonResponse } from "@server/messages/responses/HttpJsonResponse.ts";
import { CommandSocketService } from "@server/services/commands/CommandSocketService.ts";

export namespace SocketConnectionController {
  export const index = () =>
    HttpJsonResponse.success({
      sockets: Array.from(CommandSocketService.queues.entries()).map(([socket]) => ({
        readyState: socket.readyState,
        protocol: socket.protocol,
        extensions: socket.extensions,
        bufferedAmount: socket.bufferedAmount,
        url: socket.url,
      })),
    });

  export const show = (request: Request) => {
    console.log("set command");
    return HttpJsonResponse.unimplemented();
  };

  export const commands = (request: Request) => {
    console.log("set command");
    return HttpJsonResponse.unimplemented();
  };
}
