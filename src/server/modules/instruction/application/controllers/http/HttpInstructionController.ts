import { HttpHtmlResponse } from "@server/infrastructure/messaging/http/responses/HttpHtmlResponse.ts";
import { OpenApiTag } from "@server/infrastructure/openapi/OpenApiTag.ts";
import { OpenApiNs } from "@server/infrastructure/openapi/decorators/OpenApiNs.ts";
import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { HttpStaticFileResponse } from "@server/modules/static/application/messaging/http/responses/HttpStaticFileResponse.ts";
import { InstructionAssetUrl } from "../../../domain/InstructionAssetUrl.ts";
import { InstructionAssetService } from "../../services/InstructionAssetService.ts";

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
    summary: "Get the instruction for the server connection.",
    description: "Get the instruction for the server connection.",
    tags: [OpenApiTag.Instruction],
    responses: [HttpHtmlResponse.Content],
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
