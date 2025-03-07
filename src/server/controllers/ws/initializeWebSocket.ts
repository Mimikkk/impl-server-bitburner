import { JsonHttpResponse } from "@server/responses/JsonHttpResponse.ts";

// Type definitions for JSON-RPC 2.0
interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params: any;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number;
  result?: any;
  error?: any;
}

export const initializeWebSocket = (request: Request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);

  // Store files in memory (for this example)
  const fileSystem = new Map<string, string>();

  socket.onmessage = async (event) => {
    try {
      // Parse the incoming message
      const rpcRequest = JSON.parse(event.data) as JsonRpcRequest;
      let result: any = "OK";

      // Handle different RPC methods
      switch (rpcRequest.method) {
        case "pushFile":
          // Store file in our simple in-memory system
          fileSystem.set(
            `${rpcRequest.params.server}/${rpcRequest.params.filename}`,
            rpcRequest.params.content,
          );
          break;

        case "getFile":
          result = fileSystem.get(
            `${rpcRequest.params.server}/${rpcRequest.params.filename}`,
          ) || "";
          break;

        case "deleteFile":
          fileSystem.delete(
            `${rpcRequest.params.server}/${rpcRequest.params.filename}`,
          );
          break;

        case "getFileNames":
          // Get all files for specified server
          result = Array.from(fileSystem.keys())
            .filter((key) => key.startsWith(rpcRequest.params.server + "/"))
            .map((key) => key.split("/")[1]);
          break;

        default:
          throw new Error(`Unknown method: ${rpcRequest.method}`);
      }

      // Send the response
      const response: JsonRpcResponse = {
        jsonrpc: "2.0",
        id: rpcRequest.id,
        result: result,
      };

      socket.send(JSON.stringify(response));
    } catch (error) {
      // Handle errors
      const errorResponse: JsonRpcResponse = {
        jsonrpc: "2.0",
        id: -1,
        error: error.message,
      };
      socket.send(JSON.stringify(errorResponse));
    }
  };

  return response;
};
