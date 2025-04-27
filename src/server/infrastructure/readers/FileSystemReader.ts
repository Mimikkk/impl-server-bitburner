import { FileReader } from "@server/infrastructure/readers/FileReader.ts";
import { extname, resolve } from "@std/path";
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

    const extension = extname(path).slice(1) as StaticFileNs.Extension;
    if (!extension) return undefined;

    const type = StaticFileNs.TypeMap[extension] ?? StaticFileNs.typeFallback;
    const content = await this.reader.read(path, type);
    if (content === undefined) return undefined;

    const mime = StaticFileNs.MimeMap[extension] ?? StaticFileNs.mimeFallback;
    return { content, mime } as StaticFileNs.FromPath<P>;
  }
}
