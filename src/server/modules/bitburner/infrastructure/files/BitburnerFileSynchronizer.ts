import { BitburnerClientService } from "@server/modules/bitburner/application/services/BitburnerClientService.ts";
import { Log } from "@shared/logging/log.ts";

interface BitburnerFileSynchronizerOptions {
  syncMs: number;
}

export class BitburnerFileSynchronizer {
  static create(options?: BitburnerFileSynchronizerOptions) {
    return new BitburnerFileSynchronizer(options?.syncMs ?? 30_000);
  }

  private constructor(
    private readonly syncMs: number,
    private timeoutId: number | null = null,
    private readonly client = BitburnerClientService.create(),
  ) {
    this.schedule();
  }

  async sync() {
    try {
      if (!this.client.canSync()) {
        Log.warn("no connection available. skipping synchronization.");
        return;
      }

      Log.event("synchronizing files...");
      await this.client.syncClient();

      Log.event("synchronized files.");
    } catch (error) {
      Log.error("Failed to synchronize files:", error);
    }
  }

  schedule() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(async () => {
      await this.sync();
      this.schedule();
    }, this.syncMs);
  }
}
