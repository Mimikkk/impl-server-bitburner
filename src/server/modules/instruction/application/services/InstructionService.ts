import { InstructionResourceProvider } from "@server/modules/instruction/infrastructure/InstructionResourceProvider.ts";
import { InstructionResourceUrl } from "../../infrastructure/InstructionResourceUrl.ts";

export class InstructionService {
  static create(): InstructionService {
    return new InstructionService();
  }

  private constructor(
    private readonly provider = InstructionResourceProvider.create(),
  ) {}

  async read(instruction: InstructionResourceUrl): Promise<string | undefined> {
    return await this.provider.read(instruction);
  }
}
