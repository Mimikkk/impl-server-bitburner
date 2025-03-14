import { Template } from "@server/domain/modules/templates/Template.enum.ts";
import { HttpHtmlResponse } from "@server/infrastructure/messaging/responses/HttpHtmlResponse.ts";
import { HttpJsonResponseCommon } from "@server/infrastructure/messaging/responses/HttpJsonResponse.common.ts";
import { TemplateService } from "@server/application/services/Template.service.ts";

export class HttpInstructionController {
  static create() {
    return new HttpInstructionController();
  }

  private constructor(
    private readonly templates = TemplateService.create(),
  ) {}

  public async index() {
    const result = await this.templates.read(Template.Instruction);

    if (result === undefined) {
      return HttpJsonResponseCommon.nofile({ path: Template.Instruction });
    }

    return HttpHtmlResponse.success(result);
  }
}
