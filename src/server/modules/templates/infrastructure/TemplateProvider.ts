import { FileReader } from "@server/infrastructure/files/FileReader.ts";
import { resolve } from "@std/path/resolve";
import { TemplateUrl } from "../domain/constants/TemplateUrl.ts";

export class TemplateProvider {
  static create(): TemplateProvider {
    return new TemplateProvider();
  }

  private constructor(
    private readonly files = FileReader.create(),
  ) {}

  async read(template: TemplateUrl): Promise<string | undefined> {
    return await this.files.read(this.path(template));
  }

  private path(template: TemplateUrl): string {
    return resolve(this.directory, "resources", template);
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname.replace("index.ts", "");
}
