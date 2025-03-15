import { ConnectionCommandBuilder } from "../../connections/ConnectionCommandBuilder.ts";
import { ConnectionCommandHandler } from "../../connections/ConnectionCommandHandler.ts";
import { ConnectionCommandRegistry } from "../../connections/ConnectionCommandRegistry.ts";
import { ConnectionCommandValidator } from "../../connections/ConnectionCommandValidator.ts";

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
      ConnectionCommandValidator.create(
        ({ filename, content, server }: { filename: string; content: string; server: string }) =>
          typeof filename === "string" && typeof content === "string" && typeof server === "string",
      ),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const remove = ConnectionCommandBuilder
    .create()
    .withName("remove")
    .withDescription("Remove a file from a server")
    .withMethod(BitburnerMethod.Remove)
    .withValidator(
      ConnectionCommandValidator.create(({ filename, server }: { filename: string; server: string }) =>
        typeof filename === "string" && typeof server === "string"
      ),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const read = ConnectionCommandBuilder
    .create()
    .withName("read")
    .withDescription("Read a file from a server")
    .withMethod(BitburnerMethod.Read)
    .withValidator(
      ConnectionCommandValidator.create(({ filename, server }: { filename: string; server: string }) =>
        typeof filename === "string" && typeof server === "string"
      ),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const list = ConnectionCommandBuilder
    .create()
    .withName("list")
    .withDescription("List all files on a server")
    .withMethod(BitburnerMethod.List)
    .withValidator(ConnectionCommandValidator.create(({ server }: { server: string }) => typeof server === "string"))
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const names = ConnectionCommandBuilder
    .create()
    .withName("names")
    .withDescription("List all file names on a server")
    .withMethod(BitburnerMethod.Names)
    .withValidator(ConnectionCommandValidator.create(({ server }: { server: string }) => typeof server === "string"))
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const ram = ConnectionCommandBuilder
    .create()
    .withName("ram")
    .withDescription("Calculate the RAM usage of a file on a server")
    .withMethod(BitburnerMethod.Ram)
    .withValidator(
      ConnectionCommandValidator.create(({ filename, server }: { filename: string; server: string }) =>
        typeof filename === "string" && typeof server === "string"
      ),
    )
    .withHandler(ConnectionCommandHandler.logger())
    .build();

  export const definition = ConnectionCommandBuilder
    .create()
    .withName("definition")
    .withDescription("Get the definition of a file on a server")
    .withMethod(BitburnerMethod.Definition)
    .withValidator(
      ConnectionCommandValidator.create(({ filename, server }: { filename: string; server: string }) =>
        typeof filename === "string" && typeof server === "string"
      ),
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
