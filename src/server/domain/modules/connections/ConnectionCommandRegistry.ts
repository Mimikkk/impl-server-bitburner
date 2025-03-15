import { KeyBy } from "@shared/types/common.ts";
import { ConnectionCommand } from "./ConnectionCommand.ts";

export class ConnectionCommandRegistry<Cs extends Record<PropertyKey, ConnectionCommand> = {}> {
  declare type: Cs;

  private constructor(
    private readonly commands: Map<any, any>,
  ) {}

  static fromObject<const Cs extends Record<PropertyKey, ConnectionCommand>>(
    commands: Cs,
  ): ConnectionCommandRegistry<Cs> {
    return new ConnectionCommandRegistry(new Map(Object.entries(commands)));
  }

  static fromArray<const C extends ConnectionCommand[]>(commands: C): ConnectionCommandRegistry<CommandsToObject<C>> {
    return new ConnectionCommandRegistry(new Map(commands.map((command) => [command.method, command])));
  }

  get<K extends keyof Cs>(method: K): Cs[K] {
    return this.commands.get(method) as Cs[K];
  }

  list(): IterableIterator<ConnectionCommand> {
    return this.commands.values();
  }

  register<K extends keyof Cs>(method: K, command: Cs[K]): ConnectionCommandRegistry<Cs> {
    const self = this as unknown as ConnectionCommandRegistry<Cs>;
    self.commands.set(method, command);
    return self;
  }

  unregister<K extends keyof Cs>(method: K): ConnectionCommandRegistry<Omit<Cs, K>> {
    const self = this as unknown as ConnectionCommandRegistry<Omit<Cs, K>>;
    self.commands.delete(method);
    return self;
  }
}

type CommandsToObject<Cs extends ConnectionCommand[]> = KeyBy<Cs, "method">;
