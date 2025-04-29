import { colors } from "@cliffy/ansi/colors";
import { ListenerRegistry } from "@server/infrastructure/events/ListenerRegistry.ts";
import { BitburnerFileWatcher } from "@server/modules/bitburner/infrastructure/files/BitburnerFileWatcher.ts";
import { ConnectionEntity } from "@server/modules/connections/domain/entities/ConnectionEntity.ts";
import { ConnectionEvent } from "@server/modules/connections/domain/events/ConnectionEvent.ts";
import { ConnectionEventManager } from "@server/modules/connections/infrastructure/events/ConnectionEventManager.ts";
import { Log } from "@server/shared/logging/log.ts";

const c = colors.yellow;
export class BitburnerConnectionEventManager {
  static create() {
    return new BitburnerConnectionEventManager();
  }

  private constructor(
    private watcher: BitburnerFileWatcher | undefined = undefined,
    private unsubscribe: ListenerRegistry.Unsubscribe | undefined = undefined,
    private readonly manager = ConnectionEventManager.instance,
  ) {}

  static start() {
    Log.info("Starting bitburner connection event manager...");
    return BitburnerConnectionEventManager.create().start();
  }

  start() {
    const handleConnection = this.handleConnection.bind(this);
    const handleDisconnection = this.handleDisconnection.bind(this);

    this.manager.subscribe(ConnectionEvent.Connected, handleConnection);
    this.manager.subscribe(ConnectionEvent.Disconnected, handleDisconnection);
    this.unsubscribe = () => {
      this.manager.unsubscribe(ConnectionEvent.Connected, handleConnection);
      this.manager.unsubscribe(ConnectionEvent.Disconnected, handleDisconnection);
    };
  }

  stop() {
    this.unsubscribe?.();
  }

  private async handleConnection({ connection }: { connection: ConnectionEntity }) {
    if (this.watcher) return;

    this.watcher = BitburnerFileWatcher.create(connection.value);
    this.watcher.start();

    Log.info(`Started bitburner file watcher for ${c(`${connection.id}`)}.`);
    await this.watcher.sync();
  }

  private handleDisconnection({ connection }: { connection: ConnectionEntity }) {
    if (this.watcher === undefined) return;

    this.watcher.stop();
    this.watcher = undefined;

    Log.info(`Stopped bitburner file watcher for ${c(`${connection.id}`)}.`);
  }
}
