import { FileWriter } from "@server/infrastructure/files/writers/FileWriter.ts";
import { resolve } from "@std/path";

export class FileSystemWriter {
  static create(path: string = "."): FileSystemWriter {
    return new FileSystemWriter(path);
  }

  private constructor(
    private readonly location: string,
    private readonly writer = FileWriter.create(),
  ) {}

  async write(path: string, content: string | Uint8Array): Promise<boolean> {
    path = resolve(this.location, path);

    return await this.writer.write(path, content);
  }
}
