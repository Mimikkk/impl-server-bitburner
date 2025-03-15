import { TemplateService } from "@server/application/services/Template.service.ts";
import { Template } from "@server/domain/modules/templates/Template.enum.ts";
import { HttpHtmlResponse } from "@server/infrastructure/messaging/responses/HttpHtmlResponse.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";

export class HttpTemplateController {
  static create(templates: TemplateService = TemplateService.create()) {
    return new HttpTemplateController(templates);
  }

  private constructor(
    private readonly templates: TemplateService,
  ) {}

  async index() {
    const template = await this.templates.read(Template.Instruction);

    if (template === undefined) {
      return HttpJsonResponse.failure({ path: Template.Instruction, message: "Template not found" });
    }

    return HttpHtmlResponse.success(template);
  }
}
