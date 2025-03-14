import { Log } from "@shared/logging/log.ts";

export class FileReader {
  static create(): FileReader {
    return new FileReader();
  }

  async read(path: string): Promise<string | undefined> {
    try {
      return await Deno.readTextFile(path);
    } catch {
      Log.error(`Failed to read file ${path}.`);

      return undefined;
    }
  }
}
