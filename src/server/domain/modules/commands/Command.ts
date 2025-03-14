import { RpcJsonRequest } from "@server/infrastructure/messaging/requests/RpcJsonRequest.ts";
import { CommandHandler } from "@server/domain/modules/commands/Command.handler.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";

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
    public readonly identifier = IntGenerator.create(),
  ) {}

  createRequest(params: P): RpcJsonRequest<M, P> {
    return RpcJsonRequest.create(this.identifier.generate(), this.method, params);
  }
}
