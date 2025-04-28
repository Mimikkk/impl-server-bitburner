import { StaticAssetProvider } from "@server/modules/static/infrastructure/StaticAssetProvider.ts";
import { FileSystemReader } from "../../../infrastructure/files/readers/FileSystemReader.ts";
import { StaticAssetNs } from "../domain/StaticAssetUrl.ts";
import { StaticFileNs } from "../domain/StaticFile.ts";

export class StaticFileProvider {
  static create(): StaticFileProvider {
    return new StaticFileProvider();
  }

  private constructor(
    private readonly reader = FileSystemReader.create(),
    private readonly assets = StaticAssetProvider.create(),
  ) {}

  read<P extends StaticFileNs.Path>(path: P): Promise<StaticFileNs.FromPath<P> | undefined> {
    if (StaticAssetNs.isUrl(path)) {
      return this.assets.read(path);
    }
    return this.reader.read(path);
  }
}
