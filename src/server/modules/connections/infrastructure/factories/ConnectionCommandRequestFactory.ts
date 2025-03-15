import { RpcJsonRequest } from "@server/infrastructure/messaging/requests/RpcJsonRequest.ts";
import { IntGenerator } from "@server/infrastructure/persistence/identifiers/IntGenerator.ts";
import { ConnectionCommandRequest } from "@server/modules/connections/infrastructure/messaging/requests/ConnectionCommandRequest.ts";

export class ConnectionCommandRequestFactory {
  static instance = ConnectionCommandRequestFactory.create();

  static create(identifiers: IntGenerator = IntGenerator.create()): ConnectionCommandRequestFactory {
    return new ConnectionCommandRequestFactory(identifiers);
  }

  private constructor(
    private readonly identifiers: IntGenerator,
  ) {}

  create<M extends PropertyKey, P>(method: M, params: P): ConnectionCommandRequest<M, P> {
    return RpcJsonRequest.create(this.identifiers.generate(), method, params);
  }
}
