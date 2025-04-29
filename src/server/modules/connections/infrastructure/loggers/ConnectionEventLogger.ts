import { ConnectionEventManager } from "@server/modules/connections/infrastructure/events/ConnectionEventManager.ts";
import { Log } from "@shared/logging/log.ts";
import { ConnectionEvent } from "../../domain/events/ConnectionEvent.ts";

export class ConnectionEventLogger {
  static create() {
    return new ConnectionEventLogger();
  }

  private constructor() {}

  static start() {
    return ConnectionEventLogger.create().start();
  }

  start() {
    const { Connected, Disconnected, Failed } = ConnectionEvent;

    ConnectionEventManager.instance
      .subscribe(Connected, ({ connection }) => Log.info("socket opened for connection", connection.id))
      .subscribe(Disconnected, ({ connection }) => Log.info("socket closed for connection", connection.id))
      .subscribe(Failed, ({ connection }) => Log.error("socket provided an error from connection", connection.id));
  }
}
