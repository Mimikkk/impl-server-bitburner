import { CommandQueue } from "@server/services/commands/CommandQueue.ts";

export namespace CommandSocketService {
  export const queues = new WeakMap<WebSocket, CommandQueue>();

  export const manage = (socket: WebSocket) => {
    const queue = CommandQueue.create(socket);

    socket.addEventListener("close", () => remove(socket));
    queues.set(socket, queue);

    return queue;
  };

  export const close = (socket: WebSocket) => socket.close();

  const remove = (socket: WebSocket) => queues.delete(socket);
}
