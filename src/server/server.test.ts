import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";

const waitForWebSocketEvent = (ws: WebSocket, eventName: keyof WebSocketEventMap, fn?: (event: any) => void) =>
  new Promise<void>((resolve) => {
    ws.addEventListener(eventName, (event) => {
      fn?.(event);
      resolve();
    }, { once: true });
  });

describe("WebSocket Server", () => {
  it("should handle websocket connections and messages", async () => {
    const ws = new WebSocket("ws://localhost:8080");

    const promises = [
      waitForWebSocketEvent(ws, "open", (event) => {
        console.log("open", event);
      }),
      waitForWebSocketEvent(ws, "message", (event) => {
        console.log("message", event);
      }),
      waitForWebSocketEvent(ws, "error", (event) => {
        console.log("error", event);
      }),
    ];

    await Promise.any(promises);

    expect(ws.readyState).toBe(WebSocket.OPEN);

    ws.close();

    await waitForWebSocketEvent(ws, "close");
  });
});
