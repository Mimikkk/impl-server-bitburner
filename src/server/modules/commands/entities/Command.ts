import { Infer, Schema } from "@server/infrastructure/validators/Schema.ts";
import { CommandRequestFactory } from "@server/modules/commands/infrastructure/factories/CommandRequestFactory.ts";
import { VolatileCommandRequestRepository } from "@server/modules/commands/reposiories/VolatileCommandRequestRepository.ts";
import { Validator } from "../../../infrastructure/validators/Validator.ts";
import { CommandRequestModel } from "../models/CommandRequestModel.ts";
import { CommandRequestRepository } from "../reposiories/CommandRequestRepository.ts";

export class Command<
  M extends PropertyKey = PropertyKey,
  P extends Schema = Schema,
  T extends Schema = Schema,
> {
  static create<M extends PropertyKey, P extends Schema, T extends Schema>(
    name: string,
    description: string,
    method: M,
    requestValidator: Validator<P>,
    responseValidator: Validator<T>,
    requests: CommandRequestRepository = VolatileCommandRequestRepository.create(),
    factory: CommandRequestFactory = CommandRequestFactory.instance,
  ): Command<M, P, T> {
    return new Command(
      name,
      description,
      method,
      requestValidator,
      responseValidator,
      requests,
      factory,
    );
  }

  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly method: M,
    public readonly requestValidator: Validator<P>,
    public readonly responseValidator: Validator<T>,
    public readonly requests: CommandRequestRepository,
    private readonly factory: CommandRequestFactory,
  ) {}

  request(params: Infer<P>): CommandRequestModel {
    this.requestValidator.validate(params);

    const request = this.factory.create(this.method, params);

    return this.requests.persist(request);
  }
}
