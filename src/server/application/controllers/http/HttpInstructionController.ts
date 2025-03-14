import { TemplateService } from "@server/application/services/Template.service.ts";
import { Template } from "@server/domain/modules/templates/Template.enum.ts";
import { HttpHtmlResponse } from "@server/infrastructure/messaging/responses/HttpHtmlResponse.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";

export class HttpInstructionController {
  static create(templates: TemplateService = TemplateService.create()) {
    return new HttpInstructionController(templates);
  }

  private constructor(
    private readonly templates: TemplateService,
  ) {}

  public async index() {
    const result = await this.templates.read(Template.Instruction);

    if (result === undefined) {
      return HttpJsonResponse.failure({ path: Template.Instruction });
    }

    return HttpHtmlResponse.success(result);
  }
}
