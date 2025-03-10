import { HttpHtmlResponse } from "@server/messages/responses/HttpHtmlResponse.ts";
import { HttpJsonResponseCommon } from "@server/messages/responses/HttpJsonResponse.common.ts";
import { TemplateService } from "@server/modules/templates/Template.service.ts";
import { Template } from "@server/modules/templates/Template.enum.ts";

export class HttpInstructionController {
  static create() {
    return new HttpInstructionController();
  }

  private constructor(
    private readonly templates = TemplateService.create(),
  ) {}

  public async index() {
    const result = await this.templates.file(Template.Instruction);

    if (result === undefined) {
      return HttpJsonResponseCommon.nofile({ path: template });
    }

    return HttpHtmlResponse.success(result);
  }
}
