import { CommandModel } from "../../../commands/models/CommandModel.ts";

export namespace CommandResource {
  export const fromCommand = (command: CommandModel) => ({
    name: command.name,
    method: command.method,
    description: command.description,
  });

  export const fromCommands = (commands: CommandModel[]) => commands.map(fromCommand);
}
