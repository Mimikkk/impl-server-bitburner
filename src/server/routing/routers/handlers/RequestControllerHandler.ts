import { ControlFn, ControlKey } from "@server/controllers/controller.types.ts";
import { RequestHandler } from "@server/routing/routers/handlers/RequestHandler.ts";
import { RouteRequestContext } from "@server/routing/routers/routes/requests/RouteRequestContext.ts";

export class RequestControllerHandler<C extends { [key in H]: ControlFn }, H extends ControlKey<C>>
  implements RequestHandler {
  static create<C extends { [key in H]: ControlFn }, H extends ControlKey<C>>(
    controller: C,
    handler: H,
  ): RequestControllerHandler<C, H> {
    return new RequestControllerHandler(controller, handler);
  }

  private constructor(
    public readonly controller: C,
    public readonly handler: H,
  ) {}

  handle(request: Request, context: RouteRequestContext): Promise<Response> | Response {
    return this.controller[this.handler](request, context);
  }
}
