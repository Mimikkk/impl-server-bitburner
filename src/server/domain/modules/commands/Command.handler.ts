import { Log } from "@shared/logging/log.ts";

export class CommandHandler<T> {
  public static create<T>(
    onError: () => void,
    onSuccess: (response: T) => void,
  ): CommandHandler<T> {
    return new CommandHandler(onError, onSuccess);
  }

  private constructor(
    public readonly onError: () => void,
    public readonly onSuccess: (response: T) => void,
  ) {}

  static logger<T>(): CommandHandler<T> {
    return CommandHandler.create<T>(
      () => {
        Log.error("Command failed");
      },
      (data: T) => {
        Log.info(data);
      },
    );
  }
}
