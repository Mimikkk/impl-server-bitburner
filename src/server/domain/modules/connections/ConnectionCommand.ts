import { ConnectionCommandRequestFactory } from "@server/domain/modules/connections/ConnectionCommandRequestFactory.ts";
import { ConnectionCommandRequestRepository } from "@server/domain/modules/connections/ConnectionCommandRequestRepository.ts";
import { VolatileConnectionCommandRequestRepository } from "@server/domain/modules/connections/VolatileConnectionCommandRequestRepository.ts";
import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";
import { ConnectionCommandHandler } from "./ConnectionCommandHandler.ts";
import { ConnectionCommandRequestEntity } from "./ConnectionCommandRequestEntity.ts";
import { ConnectionCommandResponse } from "./ConnectionCommandResponse.ts";

export class ConnectionCommand<M extends PropertyKey = PropertyKey, P = any, T = any> {
  static create<M extends PropertyKey, P, T>(
    method: M,
    handler: ConnectionCommandHandler<T>,
    requests: ConnectionCommandRequestRepository = VolatileConnectionCommandRequestRepository.create(),
    factory: ConnectionCommandRequestFactory = ConnectionCommandRequestFactory.instance,
  ): ConnectionCommand<M, P, T> {
    return new ConnectionCommand(method, handler, requests, factory);
  }

  private constructor(
    public readonly method: M,
    public readonly handler: ConnectionCommandHandler<T>,
    public readonly requests: ConnectionCommandRequestRepository,
    private readonly factory: ConnectionCommandRequestFactory,
  ) {}

  handle(response: ConnectionCommandResponse<T>): void {
    if (RpcJsonResponse.isOk(response)) {
      this.handler.onSuccess(response.result);
    } else {
      this.handler.onError(response.error);
    }
  }

  request(params: P): ConnectionCommandRequestEntity {
    return this.requests.persist(this.factory.create(this.method, params));
  }
}
