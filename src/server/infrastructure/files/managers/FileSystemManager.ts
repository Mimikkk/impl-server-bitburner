import { FileSystemReader } from "@server/infrastructure/files/readers/FileSystemReader.ts";
import { FileSystemWriter } from "@server/infrastructure/files/writers/FileSystemWriter.ts";

export class FileSystemManager {
  static create(path: string) {
    return new FileSystemManager(path);
  }

  private constructor(
    path: string,
    private readonly writer = FileSystemWriter.create(path),
    private readonly reader = FileSystemReader.create(path),
  ) {}

  list(options: { path?: string; recursive?: boolean }): Promise<string[]> {
    return this.reader.list(options);
  }
}
