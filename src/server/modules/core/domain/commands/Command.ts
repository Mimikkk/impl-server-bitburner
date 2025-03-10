import { RpcJsonRequest } from "@server/messages/requests/RpcJsonRequest.ts";
import { CommandHandler } from "@server/modules/core/domain/commands/Command.handler.ts";
import { IntIdentifierManager } from "@server/modules/core/domain/identifiers/types/IntIdentifierManager.ts";

export class Command<M extends PropertyKey = PropertyKey, P = any, T = any> {
  static create<M extends PropertyKey, P, T>(
    method: M,
    handler: CommandHandler<T>,
  ): Command<M, P, T> {
    return new Command(method, handler);
  }

  private constructor(
    public readonly method: M,
    public readonly handler: CommandHandler<T>,
    public readonly identifier = IntIdentifierManager.create(),
  ) {}

  createRequest(params: P): RpcJsonRequest<M, P> {
    return RpcJsonRequest.create(this.identifier.next(), this.method, params);
  }
}
