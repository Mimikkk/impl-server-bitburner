import { Command } from "@server/domain/modules/commands/Command.ts";

export interface CommandGetter<
  Cs extends Record<PropertyKey, Command> = {},
> {
  get<K extends keyof Cs>(method: K): Cs[K];
}
