import { InstructionAssetUrl } from "../../domain/InstructionAssetUrl.ts";
import { InstructionAssetProvider } from "../../infrastructure/InstructionAssetProvider.ts";

export class InstructionAssetService {
  static create(): InstructionAssetService {
    return new InstructionAssetService();
  }

  private constructor(
    private readonly provider = InstructionAssetProvider.create(),
  ) {}

  read<Url extends InstructionAssetUrl>(url: Url) {
    return this.provider.read(url);
  }
}
