import { FileSystemAssetReader } from "@server/infrastructure/files/readers/FileSystemAssetReader.ts";
import { DocumentationAssetUrl } from "./DocumentationAssetUrl.ts";

export class DocumentationAssetProvider {
  static create(): DocumentationAssetProvider {
    return new DocumentationAssetProvider();
  }

  private constructor(
    private readonly reader = FileSystemAssetReader.fromMeta(import.meta),
  ) {}

  read<Url extends DocumentationAssetUrl>(url: Url) {
    return this.reader.read(url);
  }
}
