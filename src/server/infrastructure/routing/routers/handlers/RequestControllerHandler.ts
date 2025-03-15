import { Awaitable } from "@shared/types/common.ts";
import { RouteRequestContext } from "../routes/requests/RouteRequestContext.ts";
import { ControlFn, ControlKey } from "./ControllerType.ts";
import { RequestHandler } from "./RequestHandler.ts";

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

  handle(context: RouteRequestContext): Awaitable<Response> {
    return this.controller[this.handler](context);
  }
}
