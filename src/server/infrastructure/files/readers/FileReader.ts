import { Log } from "@server/shared/logging/log.ts";

export class FileReader {
  static create(): FileReader {
    return new FileReader();
  }

  async read<T extends FileReader.FileType>(path: string, type: T): Promise<FileReader.FileMap[T] | undefined> {
    try {
      if (type === "string") {
        return await Deno.readTextFile(path) as FileReader.FileMap[T];
      }

      return await Deno.readFile(path) as FileReader.FileMap[T];
    } catch (error: unknown) {
      Log.error(`Failed to read file ${path}.`, { error });

      return undefined;
    }
  }

  readStr(path: string): Promise<string | undefined> {
    return this.read(path, "string");
  }

  readU8(path: string): Promise<Uint8Array | undefined> {
    return this.read(path, "uint8");
  }
}

export namespace FileReader {
  export type FileMap = {
    string: string;
    uint8: Uint8Array;
  };

  export type FileType = keyof FileMap;
}
