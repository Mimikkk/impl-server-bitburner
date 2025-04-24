import { FileSystemReader } from "@server/infrastructure/readers/FileSystemReader.ts";
import { StaticFileNs } from "../../modules/static/domain/StaticFile.ts";

export class FileSystemAssetReader {
  static create(path: string): FileSystemAssetReader {
    return new FileSystemAssetReader(path);
  }

  private constructor(
    readonly path: string,
    private readonly reader = FileSystemReader.create(path + "/assets"),
  ) {}

  read<P extends StaticFileNs.Path>(path: P): Promise<StaticFileNs.FileFromPath<P> | undefined> {
    return this.reader.read(path);
  }
}
