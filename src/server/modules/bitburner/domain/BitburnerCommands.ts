import { array, none, number, object, string } from "@server/infrastructure/validators/Schema.ts";
import { CommandRegistry } from "@server/modules/commands/CommandRegistry.ts";
import { CommandBuilder } from "@server/modules/commands/infrastructure/builders/CommandBuilder.ts";

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
    .create()
    .withName("update")
    .withDescription("Update a file on a server")
    .withMethod(BitburnerMethod.Update)
    .withRequest(object({ filename: string(), content: string(), server: string() }))
    .withResponse(string({ const: "OK" }))
    .build();

  export const remove = CommandBuilder
    .create()
    .withName("remove")
    .withDescription("Remove a file from a server")
    .withMethod(BitburnerMethod.Remove)
    .withRequest(object({ filename: string(), server: string() }))
    .withResponse(string({ const: "OK" }))
    .build();

  export const read = CommandBuilder
    .create()
    .withName("read")
    .withDescription("Read a file from a server")
    .withMethod(BitburnerMethod.Read)
    .withRequest(object({ filename: string(), server: string() }))
    .withResponse(string())
    .build();

  export const list = CommandBuilder
    .create()
    .withName("list")
    .withDescription("List all files on a server")
    .withMethod(BitburnerMethod.List)
    .withRequest(object({ server: string() }))
    .withResponse(array(object({ filename: string(), content: string() })))
    .build();

  export const names = CommandBuilder
    .create()
    .withName("names")
    .withDescription("List all file names on a server")
    .withMethod(BitburnerMethod.Names)
    .withRequest(object({ server: string() }))
    .withResponse(array(string()))
    .build();

  export const ram = CommandBuilder
    .create()
    .withName("ram")
    .withDescription("Calculate the RAM usage of a file on a server")
    .withMethod(BitburnerMethod.Ram)
    .withRequest(object({ filename: string(), server: string() }))
    .withResponse(number())
    .build();

  export const definition = CommandBuilder
    .create()
    .withName("definition")
    .withDescription("Get the definition of a file on a server")
    .withMethod(BitburnerMethod.Definition)
    .withRequest(none())
    .withResponse(string())
    .build();

  export const all = CommandRegistry.fromArray([
    update,
    remove,
    read,
    list,
    names,
    ram,
    definition,
  ]);
}
