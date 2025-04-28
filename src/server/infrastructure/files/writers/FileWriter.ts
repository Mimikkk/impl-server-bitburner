import { Log } from "@shared/logging/log.ts";

export class FileWriter {
  static create(): FileWriter {
    return new FileWriter();
  }

  async write(path: string, content: string | Uint8Array): Promise<boolean> {
    try {
      if (typeof content === "string") {
        await Deno.writeTextFile(path, content);
      } else {
        await Deno.writeFile(path, content);
      }

      return true;
    } catch (error: unknown) {
      Log.error(`Failed to write file ${path}.`, { error });

      return false;
    }
  }
}
