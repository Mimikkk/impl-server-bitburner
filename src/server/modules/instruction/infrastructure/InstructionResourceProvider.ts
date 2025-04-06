import { FileReader } from "@server/infrastructure/files/FileReader.ts";
import { resolve } from "@std/path/resolve";
import { InstructionResourceUrl } from "./InstructionResourceUrl.ts";

export class InstructionResourceProvider {
  static create(): InstructionResourceProvider {
    return new InstructionResourceProvider();
  }

  private constructor(
    private readonly files = FileReader.create(),
  ) {}

  async read(template: InstructionResourceUrl): Promise<string | undefined> {
    return await this.files.read(this.path(template));
  }

  private path(template: InstructionResourceUrl): string {
    return resolve(this.directory, "resources", template);
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname.replace("index.ts", "");
}
