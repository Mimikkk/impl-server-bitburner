import { resolve } from "@std/path";
import { FileService } from "@server/modules/files/file.service.ts";
import { Template } from "@server/modules/templates/Template.enum.ts";

export class TemplateService {
  static create(): TemplateService {
    return new TemplateService();
  }

  private constructor(
    private readonly files = FileService.create(),
  ) {}

  path(template: Template): string {
    return resolve(this.directory, "files", template);
  }

  async file(template: Template): Promise<string | undefined> {
    return await this.files.read(this.path(template));
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname.replace("index.ts", "");
}
