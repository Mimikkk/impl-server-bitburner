import { ConnectionCommandHandler } from "@server/domain/modules/connections/ConnectionCommandHandler.ts";
import { ConnectionCommandRequestEntity } from "@server/domain/modules/connections/ConnectionCommandRequestEntity.ts";
import { ConnectionCommandRequestFactory } from "@server/domain/modules/connections/ConnectionCommandRequestFactory.ts";
import { ConnectionCommandRequestRepository } from "@server/domain/modules/connections/ConnectionCommandRequestRepository.ts";
import { ConnectionCommandResponse } from "@server/domain/modules/connections/ConnectionCommandResponse.ts";
import { ConnectionCommandValidator } from "@server/domain/modules/connections/ConnectionCommandValidator.ts";
import { VolatileConnectionCommandRequestRepository } from "@server/domain/modules/connections/VolatileConnectionCommandRequestRepository.ts";
import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";

export class ConnectionCommand<M extends PropertyKey = PropertyKey, P = any, T = any> {
  static create<M extends PropertyKey, P, T>(
    name: string,
    description: string,
    method: M,
    validator: ConnectionCommandValidator<P>,
    handler: ConnectionCommandHandler<T>,
    requests: ConnectionCommandRequestRepository = VolatileConnectionCommandRequestRepository.create(),
    factory: ConnectionCommandRequestFactory = ConnectionCommandRequestFactory.instance,
  ): ConnectionCommand<M, P, T> {
    return new ConnectionCommand(name, description, method, validator, handler, requests, factory);
  }

  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly method: M,
    public readonly validator: ConnectionCommandValidator<P>,
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
    const request = this.factory.create(this.method, params);

    return this.requests.persist(request);
  }
}
