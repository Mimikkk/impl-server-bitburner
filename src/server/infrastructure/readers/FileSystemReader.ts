import { FileReader } from "@server/infrastructure/readers/FileReader.ts";
import { resolve } from "@std/path/resolve";
import { StaticFileNs } from "../../modules/static/domain/StaticFile.ts";

export class FileSystemReader {
  static create(path: string = "."): FileSystemReader {
    return new FileSystemReader(path);
  }

  private constructor(
    private readonly path: string,
    private readonly reader = FileReader.create(),
  ) {}

  async read<P extends StaticFileNs.Path>(path: P): Promise<StaticFileNs.FromPath<P> | undefined> {
    path = resolve(this.path, path) as P;

    const extensionIndex = path.lastIndexOf(".");
    if (extensionIndex === -1) return undefined;

    const extension = path.substring(extensionIndex + 1) as StaticFileNs.Extension;
    const type = StaticFileNs.TypeMap[extension];
    if (type === undefined) return undefined;

    const content = await this.reader.read(path, type);
    if (content === undefined) return undefined;

    const mime = StaticFileNs.MimeMap[extension] ?? StaticFileNs.fallback;
    return { content, mime } as StaticFileNs.FromPath<P>;
  }
}
