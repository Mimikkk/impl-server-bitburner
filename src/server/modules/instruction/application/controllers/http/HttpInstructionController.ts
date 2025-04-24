import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { InstructionResourceUrl } from "@server/modules/instruction/infrastructure/InstructionResourceUrl.ts";
import { HttpStaticFileResponse } from "@server/modules/static/infrastructure/messaging/responses/HttpStaticFileResponse.ts";
import { HttpHtmlResponse } from "../../../../../infrastructure/messaging/responses/http/HttpHtmlResponse.ts";
import { InstructionService } from "../../services/InstructionService.ts";

@ControllerNs.controller({ name: "Instruction" })
export class HttpInstructionController {
  static create(instruction: InstructionService = InstructionService.create()) {
    return new HttpInstructionController(instruction);
  }

  private constructor(
    private readonly service: InstructionService,
  ) {}

  @RouteNs.get("")
  @OpenApiNs.route({
    summary: "Get the instruction for the server connection.",
    description: "Get the instruction for the server connection.",
    tags: [OpenApiTag.Instruction],
    responses: [HttpHtmlResponse.Content],
  })
  async index() {
    const path = InstructionResourceUrl.Index;
    const file = await this.service.read(path);

    if (file === undefined) {
      return HttpStaticFileResponse.missing({ path });
    }

    return HttpStaticFileResponse.content(file);
  }
}
