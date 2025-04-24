import { CommandModel } from "@server/modules/commands/domain/models/CommandModel.ts";

export type CommandResource = {
  name: string;
  method: PropertyKey;
  description: string;
};

export namespace CommandResourceNs {
  export const fromCommand = (command: CommandModel): CommandResource => ({
    name: command.name,
    method: command.method,
    description: command.description,
  });

  export const fromCommands = (commands: CommandModel[]): CommandResource[] => commands.map(fromCommand);
}
