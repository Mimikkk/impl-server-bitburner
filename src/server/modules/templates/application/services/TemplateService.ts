import { TemplateUrl } from "../../domain/constants/TemplateUrl.ts";
import { TemplateProvider } from "../../infrastructure/TemplateProvider.ts";

export class TemplateService {
  static create(): TemplateService {
    return new TemplateService();
  }

  private constructor(
    private readonly provider = TemplateProvider.create(),
  ) {}

  async read(template: TemplateUrl): Promise<string | undefined> {
    return await this.provider.read(template);
  }
}
