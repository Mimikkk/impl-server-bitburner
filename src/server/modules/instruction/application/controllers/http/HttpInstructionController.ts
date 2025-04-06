import { ControllerNs } from "@server/infrastructure/routing/routes/decorators/ControllerNs.ts";
import { RouteNs } from "@server/infrastructure/routing/routes/decorators/RouteNs.ts";
import { InstructionResourceUrl } from "@server/modules/instruction/infrastructure/InstructionResourceUrl.ts";
import { HttpStaticFileResponse } from "@server/modules/static/infrastructure/messaging/responses/HttpStaticFileResponse.ts";
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
  async index() {
    const file = await this.service.read(InstructionResourceUrl.Index);

    if (file === undefined) {
      return HttpStaticFileResponse.missing(InstructionResourceUrl.Index);
    }

    return HttpStaticFileResponse.found(file);
  }
}
