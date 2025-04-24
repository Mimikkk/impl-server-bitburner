import { FileSystemAssetReader } from "@server/infrastructure/readers/FileSystemAssetReader.ts";
import { StaticAssetUrl } from "../domain/StaticAssetUrl.ts";

export class StaticAssetProvider {
  static create(): StaticAssetProvider {
    return new StaticAssetProvider();
  }

  private constructor(
    private readonly reader: FileSystemAssetReader = FileSystemAssetReader.create(StaticAssetProvider.directory),
  ) {}

  async read<U extends StaticAssetUrl>(url: U) {
    return await this.reader.read(url);
  }

  private static readonly url = new URL(import.meta.dirname!);
  private static readonly directory = StaticAssetProvider.url.pathname;
}
