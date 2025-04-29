import { Log } from "@server/shared/logging/log.ts";
import { dirname } from "@std/path";

export class FileWriter {
  static create(): FileWriter {
    return new FileWriter();
  }

  async write(path: string, content: string | Uint8Array): Promise<boolean> {
    try {
      const directory = dirname(path);

      if (directory) {
        try {
          await Deno.mkdir(directory, { recursive: true });
        } catch {
          return false;
        }
      }

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
