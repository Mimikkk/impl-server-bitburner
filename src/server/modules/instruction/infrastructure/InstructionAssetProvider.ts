import { FileSystemAssetReader } from "@server/infrastructure/files/readers/FileSystemAssetReader.ts";
import { InstructionAssetUrl } from "../domain/InstructionAssetUrl.ts";

export class InstructionAssetProvider {
  static create(): InstructionAssetProvider {
    return new InstructionAssetProvider();
  }

  private constructor(
    private readonly reader = FileSystemAssetReader.fromMeta(import.meta),
  ) {}

  read<Url extends InstructionAssetUrl>(url: Url) {
    return this.reader.read(url);
  }
}
