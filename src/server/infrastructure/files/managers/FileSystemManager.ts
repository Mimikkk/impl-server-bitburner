import { FileSystemReader } from "@server/infrastructure/files/readers/FileSystemReader.ts";
import { FileSystemWriter } from "@server/infrastructure/files/writers/FileSystemWriter.ts";
import { StaticFileNs } from "@server/modules/static/domain/StaticFile.ts";

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

  readStr(path: string): Promise<string | undefined> {
    return this.reader.readStr(path);
  }

  readU8(path: string): Promise<Uint8Array | undefined> {
    return this.reader.readU8(path);
  }

  read<P extends StaticFileNs.Path>(path: P): Promise<StaticFileNs.FromPath<P> | undefined> {
    return this.reader.read(path);
  }

  write(path: string, content: string): Promise<boolean> {
    return this.writer.write(path, content);
  }
}
