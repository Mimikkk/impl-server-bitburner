export class BitburnerFileEventHandler {
  static create() {
    return new BitburnerFileEventHandler();
  }

  private constructor() {}

  async handle(event: Deno.FsEvent): Promise<void> {
    // to impl
  }
}
