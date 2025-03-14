import { CommandHandler } from "@server/domain/modules/commands/Command.handler.ts";
import { Command } from "@server/domain/modules/commands/Command.ts";

export class CommandBuilder<M extends string, P, T> {
  static create<M extends string, T>(
    method: M,
    handler: CommandHandler<T>,
  ) {
    return new CommandBuilder(method, handler);
  }

  private constructor(
    public readonly method: M,
    public readonly handler: CommandHandler<T>,
  ) {}

  withParams<P>(): CommandBuilder<M, P, T> {
    return this as unknown as CommandBuilder<M, P, T>;
  }

  build(): Command<M, P, T> {
    return Command.create<M, P, T>(this.method, this.handler);
  }
}
