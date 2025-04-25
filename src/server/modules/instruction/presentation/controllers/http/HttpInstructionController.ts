import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { InstructionAssetService } from "@server/modules/instruction/application/services/InstructionAssetService.ts";
import { HttpStaticFileResponse } from "@server/modules/static/presentation/messaging/http/responses/HttpStaticFileResponse.ts";
import { HttpHtmlResponse } from "@server/presentation/messaging/http/responses/HttpHtmlResponse.ts";
import { InstructionAssetUrl } from "../../../domain/InstructionAssetUrl.ts";

@ControllerNs.controller({ name: "Instruction" })
export class HttpInstructionController {
  static create(instruction: InstructionAssetService = InstructionAssetService.create()) {
    return new HttpInstructionController(instruction);
  }

  private constructor(
    private readonly service: InstructionAssetService,
  ) {}

  @RouteNs.get("")
  @OpenApiNs.route({
    summary: "Get the instruction for the server connection",
    description: "Get the instruction for the server connection.",
    tags: [OpenApiTag.Instruction],
    responses: [HttpStaticFileResponse.Missing, HttpHtmlResponse.Content],
  })
  async index() {
    const path = InstructionAssetUrl.Index;
    const file = await this.service.read(path);

    if (file === undefined) {
      return HttpStaticFileResponse.missing({ path });
    }

    return HttpStaticFileResponse.content(file);
  }
}
