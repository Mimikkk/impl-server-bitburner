import { BitburnerFileResource } from "@server/modules/bitburner/resources/BitburnerFileResource.ts";
import { CommandBuilder } from "@server/modules/core/domain/commands/Command.builder.ts";
import { CommandRegistry } from "@server/modules/core/domain/commands/Command.registry.ts";
import { CommandHandler } from "@server/modules/core/domain/commands/Command.handler.ts";

export enum BitburnerMethod {
  Update = "pushFile",
  Remove = "deleteFile",
  Read = "getFile",
  List = "getAllFiles",
  Names = "getFileNames",
  Ram = "calculateRam",
  Definition = "getDefinitionFile",
}

export namespace BitburnerCommands {
  export const update = CommandBuilder
    .create(BitburnerMethod.Update, CommandHandler.logger())
    .withParams<{ filename: string; content: string; server: string }>()
    .build();

  export const remove = CommandBuilder
    .create(BitburnerMethod.Remove, CommandHandler.logger())
    .withParams<{ filename: string; server: string }>()
    .build();

  export const read = CommandBuilder
    .create(BitburnerMethod.Read, CommandHandler.logger<BitburnerFileResource>())
    .withParams<{ filename: string; server: string }>()
    .build();

  export const list = CommandBuilder
    .create(BitburnerMethod.List, CommandHandler.logger<BitburnerFileResource[]>())
    .withParams<{ server: string }>()
    .build();

  export const names = CommandBuilder
    .create(BitburnerMethod.Names, CommandHandler.logger<string[]>())
    .withParams<{ server: string }>()
    .build();

  export const ram = CommandBuilder
    .create(BitburnerMethod.Ram, CommandHandler.logger<number>())
    .withParams<{ filename: string; server: string }>()
    .build();

  export const definition = CommandBuilder
    .create(BitburnerMethod.Definition, CommandHandler.logger<string>())
    .withParams<{ filename: string; server: string }>()
    .build();

  export const registry = CommandRegistry.fromArray([
    update,
    remove,
    read,
    list,
    names,
    ram,
    definition,
  ]);
}
