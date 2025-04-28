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
  ) {
    this.schedule();
  }

  async sync() {
    try {
      Log.event("synchronizing bitburner files...");

      // to impl

      Log.event("synchronized bitburner files.");
    } catch (error) {
      Log.error("Failed to synchronize bitburner files:", error);
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
