import { Some } from "@shared/types/common.ts";
import { Validator } from "../../../../infrastructure/validators/Validator.ts";
import { ConnectionCommandHandler } from "../../domain/commands/ConnectionCommandHandler.ts";
import { ConnectionCommand } from "../../domain/models/ConnectionCommand.ts";

export class ConnectionCommandBuilder<N, D, M, P, T> {
  static create(): ValidatedBuilder<ConnectionCommandBuilder<null, null, null, null, null>> {
    return new ConnectionCommandBuilder<null, null, null, null, null>();
  }

  private constructor(
    private name: N | null = null,
    private description: D | null = null,
    private method: M | null = null,
    private validator: Validator<P> | null = null,
    private handler: ConnectionCommandHandler<T> | null = null,
  ) {}

  withName<NN extends string>(name: NN): ValidatedBuilder<ConnectionCommandBuilder<NN, D, M, P, T>> {
    this.name = name as unknown as N;
    return this as unknown as ConnectionCommandBuilder<NN, D, M, P, T>;
  }

  withDescription<DD extends string>(description: DD): ValidatedBuilder<ConnectionCommandBuilder<N, DD, M, P, T>> {
    this.description = description as unknown as D;
    return this as unknown as ConnectionCommandBuilder<N, DD, M, P, T>;
  }

  withMethod<NM extends string>(method: NM): ValidatedBuilder<ConnectionCommandBuilder<N, D, NM, P, T>> {
    this.method = method as unknown as M;
    return this as unknown as ConnectionCommandBuilder<N, D, NM, P, T>;
  }

  withValidator<NP>(
    validator: Validator<NP>,
  ): ValidatedBuilder<ConnectionCommandBuilder<N, D, M, NP, T>> {
    this.validator = validator as unknown as Validator<P>;
    return this as unknown as ConnectionCommandBuilder<N, D, M, NP, T>;
  }

  withHandler<NH>(handler: ConnectionCommandHandler<NH>): ValidatedBuilder<ConnectionCommandBuilder<N, D, M, P, NH>> {
    this.handler = handler as unknown as ConnectionCommandHandler<T>;
    return this as unknown as ConnectionCommandBuilder<N, D, M, P, NH>;
  }

  build(): ConnectionCommand<M & string, P, T> {
    return ConnectionCommand.create(
      this.name as N & string,
      this.description as D & string,
      this.method as M & string,
      this.validator as Validator<P>,
      this.handler as ConnectionCommandHandler<T>,
    );
  }
}

type ValidBuilder<B> = B extends ConnectionCommandBuilder<infer N, infer D, infer M, infer P, infer T>
  ? Some<[N, D, M, P, T], null>
  : never;

type ValidatedBuilder<B> = ValidBuilder<B> extends true ? Omit<B, "build"> : B;
