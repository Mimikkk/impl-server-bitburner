import { Infer, Schema } from "@server/infrastructure/validators/Schema.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { Validator } from "@server/infrastructure/validators/Validator.ts";
import { CommandRequestEntity } from "@server/modules/commands/domain/entities/CommandRequestEntity.ts";
import { CommandRequestFactory } from "@server/modules/commands/infrastructure/factories/CommandRequestFactory.ts";
import { CommandRequestRepository } from "@server/modules/commands/infrastructure/repositories/CommandRequestRepository.ts";
import { VolatileCommandRequestRepository } from "@server/modules/commands/infrastructure/repositories/VolatileCommandRequestRepository.ts";

export class CommandModel<
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
  ): CommandModel<M, RQ, RS> {
    return new CommandModel(
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

  request(params: Infer<RQ>): CommandRequestEntity | ValidationError[] {
    const errors = this.requestValidator.validate(params);
    if (ValidationError.is(errors)) {
      return errors;
    }

    const request = this.factory.create(this.method, params);

    return this.requests.persist(request);
  }
}
