import { Command } from "@server/modules/commands/entities/Command.ts";

export namespace CommandResource {
  export const fromCommand = (command: Command) => ({
    name: command.name,
    method: command.method,
    description: command.description,
  });

  export const fromCommands = (commands: Command[]) => commands.map(fromCommand);
}
