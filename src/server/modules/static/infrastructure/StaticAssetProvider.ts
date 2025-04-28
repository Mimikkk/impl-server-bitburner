import { FileSystemAssetReader } from "@server/infrastructure/files/readers/FileSystemAssetReader.ts";
import { StaticAssetUrl } from "../domain/StaticAssetUrl.ts";

export class StaticAssetProvider {
  static create(): StaticAssetProvider {
    return new StaticAssetProvider();
  }

  private constructor(
    private readonly reader: FileSystemAssetReader = FileSystemAssetReader.fromMeta(import.meta),
  ) {}

  async read<U extends StaticAssetUrl>(url: U) {
    return await this.reader.read(url);
  }
}
