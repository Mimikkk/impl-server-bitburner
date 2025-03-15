import { Log } from "@shared/logging/log.ts";

export class ConnectionCommandHandler<T> {
  public static create<T>(
    onError: (error: unknown) => void,
    onSuccess: (response: T) => void,
  ): ConnectionCommandHandler<T> {
    return new ConnectionCommandHandler(onError, onSuccess);
  }

  private constructor(
    public readonly onError: (error: unknown) => void,
    public readonly onSuccess: (response: T) => void,
  ) {}

  static logger<T>(): ConnectionCommandHandler<T> {
    return ConnectionCommandHandler.create<T>(
      (error: unknown) => {
        Log.error("Command failed", error);
      },
      (data: T) => {
        Log.info(data);
      },
    );
  }
}
