import { Command } from "@server/modules/core/domain/commands/Command.ts";

export interface CommandGetter<
  Cs extends Record<PropertyKey, Command> = {},
> {
  get<K extends keyof Cs>(method: K): Cs[K];
}
