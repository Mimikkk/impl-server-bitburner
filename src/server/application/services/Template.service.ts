import { Template } from "@server/domain/modules/templates/Template.enum.ts";
import { TemplateProvider } from "@server/domain/modules/templates/Template.provider.ts";

export class TemplateService {
  static create(): TemplateService {
    return new TemplateService();
  }

  private constructor(
    private readonly provider = TemplateProvider.create(),
  ) {}

  async read(template: Template): Promise<string | undefined> {
    return await this.provider.read(template);
  }
}
