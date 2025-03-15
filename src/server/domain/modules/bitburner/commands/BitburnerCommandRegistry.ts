import { BitburnerFileResource } from "@server/domain/modules/bitburner/resources/BitburnerFileResource.ts";
import { ConnectionCommandBuilder } from "../../connections/ConnectionCommandBuilder.ts";
import { ConnectionCommandHandler } from "../../connections/ConnectionCommandHandler.ts";
import { ConnectionCommandRegistry } from "../../connections/ConnectionCommandRegistry.ts";

export enum BitburnerMethod {
  Update = "pushFile",
  Remove = "deleteFile",
  Read = "getFile",
  List = "getAllFiles",
  Names = "getFileNames",
  Ram = "calculateRam",
  Definition = "getDefinitionFile",
}

export namespace BitburnerCommandRegistry {
  export const update = ConnectionCommandBuilder
    .create(BitburnerMethod.Update, ConnectionCommandHandler.logger())
    .withParams<{ filename: string; content: string; server: string }>()
    .build();

  export const remove = ConnectionCommandBuilder
    .create(BitburnerMethod.Remove, ConnectionCommandHandler.logger())
    .withParams<{ filename: string; server: string }>()
    .build();

  export const read = ConnectionCommandBuilder
    .create(BitburnerMethod.Read, ConnectionCommandHandler.logger<BitburnerFileResource>())
    .withParams<{ filename: string; server: string }>()
    .build();

  export const list = ConnectionCommandBuilder
    .create(BitburnerMethod.List, ConnectionCommandHandler.logger<BitburnerFileResource[]>())
    .withParams<{ server: string }>()
    .build();

  export const names = ConnectionCommandBuilder
    .create(BitburnerMethod.Names, ConnectionCommandHandler.logger<string[]>())
    .withParams<{ server: string }>()
    .build();

  export const ram = ConnectionCommandBuilder
    .create(BitburnerMethod.Ram, ConnectionCommandHandler.logger<number>())
    .withParams<{ filename: string; server: string }>()
    .build();

  export const definition = ConnectionCommandBuilder
    .create(BitburnerMethod.Definition, ConnectionCommandHandler.logger<string>())
    .withParams<{ filename: string; server: string }>()
    .build();

  export const all = ConnectionCommandRegistry.fromArray([
    update,
    remove,
    read,
    list,
    names,
    ram,
    definition,
  ]);
}
