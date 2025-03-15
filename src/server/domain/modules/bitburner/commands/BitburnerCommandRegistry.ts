import { BodyValidator } from "../../../../infrastructure/validators/BodyValidator.ts";
import { Validators } from "../../../../infrastructure/validators/Validators.ts";
import { ConnectionCommandBuilder } from "../../connections/commands/ConnectionCommandBuilder.ts";
import { ConnectionCommandHandler } from "../../connections/commands/ConnectionCommandHandler.ts";
import { ConnectionCommandRegistry } from "../../connections/commands/ConnectionCommandRegistry.ts";

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
    .create()
    .withName("update")
    .withDescription("Update a file on a server")
    .withMethod(BitburnerMethod.Update)
    .withValidator(
      BodyValidator.create<{ filename: string; content: string; server: string }>({
        filename: Validators.string(),
        content: Validators.string(),
        server: Validators.string(),
      }),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const remove = ConnectionCommandBuilder
    .create()
    .withName("remove")
    .withDescription("Remove a file from a server")
    .withMethod(BitburnerMethod.Remove)
    .withValidator(
      BodyValidator.create<{ filename: string; server: string }>({
        filename: Validators.string(),
        server: Validators.string(),
      }),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const read = ConnectionCommandBuilder
    .create()
    .withName("read")
    .withDescription("Read a file from a server")
    .withMethod(BitburnerMethod.Read)
    .withValidator(
      BodyValidator.create<{ filename: string; server: string }>({
        filename: Validators.string(),
        server: Validators.string(),
      }),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const list = ConnectionCommandBuilder
    .create()
    .withName("list")
    .withDescription("List all files on a server")
    .withMethod(BitburnerMethod.List)
    .withValidator(
      BodyValidator.create<{ server: string }>({
        server: Validators.string(),
      }),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const names = ConnectionCommandBuilder
    .create()
    .withName("names")
    .withDescription("List all file names on a server")
    .withMethod(BitburnerMethod.Names)
    .withValidator(
      BodyValidator.create<{ server: string }>({
        server: Validators.string(),
      }),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const ram = ConnectionCommandBuilder
    .create()
    .withName("ram")
    .withDescription("Calculate the RAM usage of a file on a server")
    .withMethod(BitburnerMethod.Ram)
    .withValidator(
      BodyValidator.create<{ filename: string; server: string }>({
        filename: Validators.string(),
        server: Validators.string(),
      }),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const definition = ConnectionCommandBuilder
    .create()
    .withName("definition")
    .withDescription("Get the definition of a file on a server")
    .withMethod(BitburnerMethod.Definition)
    .withValidator(
      BodyValidator.create<{ filename: string; server: string }>({
        filename: Validators.string(),
        server: Validators.string(),
      }),
    )
    .withHandler(ConnectionCommandHandler.logger())
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
