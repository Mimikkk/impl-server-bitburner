import { ConnectionCommand } from "@server/domain/modules/connections/ConnectionCommand.ts";
import { ConnectionCommandHandler } from "@server/domain/modules/connections/ConnectionCommandHandler.ts";

export class ConnectionCommandBuilder<M extends string, P, T> {
  static create<M extends string, T>(
    method: M,
    handler: ConnectionCommandHandler<T>,
  ) {
    return new ConnectionCommandBuilder(method, handler);
  }

  private constructor(
    public readonly method: M,
    public readonly handler: ConnectionCommandHandler<T>,
  ) {}

  withParams<P>(): ConnectionCommandBuilder<M, P, T> {
    return this as unknown as ConnectionCommandBuilder<M, P, T>;
  }

  build(): ConnectionCommand<M, P, T> {
    return ConnectionCommand.create<M, P, T>(this.method, this.handler);
  }
}
