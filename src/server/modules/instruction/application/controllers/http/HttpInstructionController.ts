import { HttpHtmlResponse } from "@server/infrastructure/messaging/responses/HttpHtmlResponse.ts";
import { HttpJsonResponse } from "@server/infrastructure/messaging/responses/HttpJsonResponse.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { InstructionService } from "@server/modules/instruction/application/services/InstructionService.ts";
import { InstructionResourceUrl } from "@server/modules/instruction/infrastructure/InstructionResourceUrl.ts";

@OpenApiNs.controller({ name: "Templates", type: "http" })
export class HttpInstructionController {
  static create(instruction: InstructionService = InstructionService.create()) {
    return new HttpInstructionController(instruction);
  }

  private constructor(
    private readonly instruction: InstructionService,
  ) {}

  @RouteNs.get("/")
  @OpenApiNs.route({
    summary: "Get the template",
    description: "Get the template",
    tags: [OpenApiTag.Template],
    responses: {
      200: { description: "OK", content: { "text/html": { schema: { type: "string" } } } },
      404: {
        description: "Not Found",
        content: {
          "application/json": {
            schema: { type: "object", properties: { path: { type: "string" }, message: { type: "string" } } },
          },
        },
      },
    },
  })
  async index() {
    const instruction = await this.instruction.read(InstructionResourceUrl.Index);

    if (instruction === undefined) {
      return HttpJsonResponse.failure({ path: InstructionResourceUrl.Index, message: "Instruction not found" });
    }

    return HttpHtmlResponse.success(instruction);
  }
}
