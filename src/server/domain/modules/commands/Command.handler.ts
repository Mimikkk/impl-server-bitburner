import { Log } from "@shared/logging/log.ts";

export class CommandHandler<T> {
  public static create<T>(
    onError: (error: unknown) => void,
    onSuccess: (response: T) => void,
  ): CommandHandler<T> {
    return new CommandHandler(onError, onSuccess);
  }

  private constructor(
    public readonly onError: (error: unknown) => void,
    public readonly onSuccess: (response: T) => void,
  ) {}

  static logger<T>(): CommandHandler<T> {
    return CommandHandler.create<T>(
      (error: unknown) => {
        Log.error("Command failed", error);
      },
      (data: T) => {
        Log.info(data);
      },
    );
  }
}
