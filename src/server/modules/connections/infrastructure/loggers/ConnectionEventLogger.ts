import { colors } from "@cliffy/ansi/colors";
import { ConnectionEventManager } from "@server/modules/connections/infrastructure/events/ConnectionEventManager.ts";
import { Log } from "@server/shared/logging/log.ts";
import { ConnectionEvent } from "../../domain/events/ConnectionEvent.ts";

const c = colors.yellow;
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
      .subscribe(Connected, ({ connection }) => Log.info(`socket opened for connection ${c(`${connection.id}`)}.`))
      .subscribe(Disconnected, ({ connection }) => Log.info(`socket closed for connection ${c(`${connection.id}`)}.`))
      .subscribe(
        Failed,
        ({ connection }) => Log.error(`socket provided an error from connection ${c(`${connection.id}`)}.`),
      );
  }
}
