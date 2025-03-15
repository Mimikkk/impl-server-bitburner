import { HttpHtmlResponse } from "@server/infrastructure/messaging/responses/HttpHtmlResponse.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { TemplateUrl } from "../../../domain/constants/TemplateUrl.ts";
import { TemplateService } from "../../services/TemplateService.ts";

export class HttpTemplateController {
  static create(templates: TemplateService = TemplateService.create()) {
    return new HttpTemplateController(templates);
  }

  private constructor(
    private readonly templates: TemplateService,
  ) {}

  async index() {
    const template = await this.templates.read(TemplateUrl.Instruction);

    if (template === undefined) {
      return HttpJsonResponse.failure({ path: TemplateUrl.Instruction, message: "Template not found" });
    }

    return HttpHtmlResponse.success(template);
  }
}
