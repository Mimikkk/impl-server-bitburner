import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { CommandRequestModel } from "@server/modules/commands/presentation/messaging/rpc/requests/CommandRequest.ts";
import { RpcJsonRequest } from "@server/presentation/messaging/rpc/requests/RpcJsonRequest.ts";

export class CommandRequestFactory {
  static instance = CommandRequestFactory.create();

  static create(identifiers: IntGenerator = IntGenerator.create()): CommandRequestFactory {
    return new CommandRequestFactory(identifiers);
  }

  private constructor(
    private readonly identifiers: IntGenerator,
  ) {}

  create<M extends PropertyKey, P>(method: M, params: P): CommandRequestModel<M, P> {
    return RpcJsonRequest.create(this.identifiers.generate(), method, params);
  }
}
