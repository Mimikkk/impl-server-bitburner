import { RpcJsonRequest } from "@server/infrastructure/messaging/rpc/requests/RpcJsonRequest.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { CommandRequest } from "@server/modules/commands/application/messaging/http/requests/CommandRequest.ts";

export class CommandRequestFactory {
  static instance = CommandRequestFactory.create();

  static create(identifiers: IntGenerator = IntGenerator.create()): CommandRequestFactory {
    return new CommandRequestFactory(identifiers);
  }

  private constructor(
    private readonly identifiers: IntGenerator,
  ) {}

  create<M extends PropertyKey, P>(method: M, params: P): CommandRequest<M, P> {
    return RpcJsonRequest.create(this.identifiers.generate(), method, params);
  }
}
