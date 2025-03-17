import { Schema } from "@server/infrastructure/validators/Schema.ts";
import { ValueValidator } from "@server/infrastructure/validators/ValueValidator.ts";
import { Some } from "@shared/types/common.ts";
import { Command } from "../../entities/Command.ts";

export class CommandBuilder<N, D, M, P, T> {
  static create(): ValidatedBuilder<CommandBuilder<null, null, null, null, null>> {
    return new CommandBuilder<null, null, null, null, null>();
  }

  private constructor(
    private name: N | null = null,
    private description: D | null = null,
    private method: M | null = null,
    private requestSchema: P | null = null,
    private responseSchema: T | null = null,
  ) {}

  withName<const NN extends string>(name: NN): ValidatedBuilder<CommandBuilder<NN, D, M, P, T>> {
    this.name = name as unknown as N;
    return this as unknown as CommandBuilder<NN, D, M, P, T>;
  }

  withDescription<DD extends string>(description: DD): ValidatedBuilder<CommandBuilder<N, DD, M, P, T>> {
    this.description = description as unknown as D;
    return this as unknown as CommandBuilder<N, DD, M, P, T>;
  }

  withMethod<const NM extends string>(method: NM): ValidatedBuilder<CommandBuilder<N, D, NM, P, T>> {
    this.method = method as unknown as M;
    return this as unknown as CommandBuilder<N, D, NM, P, T>;
  }

  withRequest<const NP extends Schema>(schema: NP): ValidatedBuilder<CommandBuilder<N, D, M, NP, T>> {
    this.requestSchema = schema as unknown as P;
    return this as unknown as CommandBuilder<N, D, M, NP, T>;
  }

  withResponse<const NT extends Schema>(schema: NT): ValidatedBuilder<CommandBuilder<N, D, M, P, NT>> {
    this.responseSchema = schema as unknown as T;
    return this as unknown as CommandBuilder<N, D, M, P, NT>;
  }

  /* @ts-ignore - override type safety */
  build(): Command<M, P, T> {
    return Command.create(
      this.name as N & string,
      this.description as D & string,
      this.method as M & string,
      ValueValidator.create(this.requestSchema as P & Schema),
      ValueValidator.create(this.responseSchema as T & Schema),
    ) as Command<M & string, P & Schema, T & Schema>;
  }
}

type ValidBuilder<B> = B extends CommandBuilder<infer N, infer D, infer M, infer P, infer T>
  ? Some<[N, D, M, P, T], null>
  : never;

type ValidatedBuilder<B> = ValidBuilder<B> extends true ? Omit<B, "build"> : B;
