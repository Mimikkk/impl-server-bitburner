import { Infer, Schema } from "@server/infrastructure/validators/Schema.ts";
import { CommandRequestFactory } from "@server/modules/commands/infrastructure/factories/CommandRequestFactory.ts";
import { VolatileCommandRequestRepository } from "@server/modules/commands/reposiories/VolatileCommandRequestRepository.ts";
import { Validator } from "../../../infrastructure/validators/Validator.ts";
import { CommandRequestModel } from "../models/CommandRequestModel.ts";
import { CommandRequestRepository } from "../reposiories/CommandRequestRepository.ts";

export class Command<
  M extends PropertyKey = PropertyKey,
  RQ extends Schema = Schema,
  RS extends Schema = Schema,
> {
  static create<M extends PropertyKey, RQ extends Schema, RS extends Schema>(
    name: string,
    description: string,
    method: M,
    requestValidator: Validator<RQ>,
    responseValidator: Validator<RS>,
    requests: CommandRequestRepository = VolatileCommandRequestRepository.create(),
    factory: CommandRequestFactory = CommandRequestFactory.instance,
  ): Command<M, RQ, RS> {
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
    public readonly requestValidator: Validator<RQ>,
    public readonly responseValidator: Validator<RS>,
    public readonly requests: CommandRequestRepository,
    private readonly factory: CommandRequestFactory,
  ) {}

  request(params: Infer<RQ>): CommandRequestModel {
    this.requestValidator.validate(params);

    const request = this.factory.create(this.method, params);

    return this.requests.persist(request);
  }
}
