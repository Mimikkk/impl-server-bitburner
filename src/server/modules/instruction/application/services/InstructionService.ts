import { InstructionResourceProvider } from "@server/modules/instruction/infrastructure/InstructionResourceProvider.ts";
import { InstructionResourceUrl } from "../../infrastructure/InstructionResourceUrl.ts";

export class InstructionService {
  static create(): InstructionService {
    return new InstructionService();
  }

  private constructor(
    private readonly provider = InstructionResourceProvider.create(),
  ) {}

  read<Url extends InstructionResourceUrl>(url: Url) {
    return this.provider.read(url);
  }
}
