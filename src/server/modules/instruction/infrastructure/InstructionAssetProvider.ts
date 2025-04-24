import { FileSystemAssetReader } from "@server/infrastructure/readers/FileSystemAssetReader.ts";
import { InstructionAssetUrl } from "../domain/InstructionAssetUrl.ts";

export class InstructionAssetProvider {
  static create(): InstructionAssetProvider {
    return new InstructionAssetProvider();
  }

  private constructor(
    private readonly reader = FileSystemAssetReader.create(InstructionAssetProvider.directory),
  ) {}

  read<Url extends InstructionAssetUrl>(url: Url) {
    return this.reader.read(url);
  }

  private static readonly url = new URL(import.meta.dirname!);
  private static readonly directory = InstructionAssetProvider.url.pathname;
}
