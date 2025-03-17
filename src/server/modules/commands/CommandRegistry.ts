import { KeyBy } from "@shared/types/common.ts";
import { Command } from "./entities/Command.ts";

export class CommandRegistry<Cs extends Record<PropertyKey, Command> = {}> {
  declare type: Cs;

  private constructor(
    private readonly commands: Map<any, any>,
  ) {}

  static fromObject<const Cs extends Record<PropertyKey, Command>>(
    commands: Cs,
  ): CommandRegistry<Cs> {
    return new CommandRegistry(new Map(Object.entries(commands)));
  }

  static fromArray<const C extends Command[]>(commands: C): CommandRegistry<CommandsToObject<C>> {
    return new CommandRegistry(new Map(commands.map((command) => [command.name, command])));
  }

  find<K extends keyof Cs>(method: K): Cs[K] {
    return this.commands.get(method) as Cs[K];
  }

  list(): IterableIterator<Command> {
    return this.commands.values();
  }

  register<K extends keyof Cs>(method: K, command: Cs[K]): CommandRegistry<Cs> {
    const self = this as unknown as CommandRegistry<Cs>;
    self.commands.set(method, command);
    return self;
  }

  unregister<K extends keyof Cs>(method: K): CommandRegistry<Omit<Cs, K>> {
    const self = this as unknown as CommandRegistry<Omit<Cs, K>>;
    self.commands.delete(method);
    return self;
  }
}

type CommandsToObject<Cs extends Command[]> = KeyBy<Cs, "name">;
