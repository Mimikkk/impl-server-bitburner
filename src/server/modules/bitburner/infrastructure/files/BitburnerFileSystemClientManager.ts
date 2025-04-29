import { BitburnerCommands } from "@server/modules/bitburner/domain/BitburnerCommands.ts";
import { ConnectionCommandError } from "@server/modules/connections/domain/errors/ConnectionCommandError.ts";
import { ConnectionModel } from "@server/modules/connections/domain/models/ConnectionModel.ts";

export class BitburnerFileSystemClientManager {
  static create(connection: ConnectionModel) {
    return new BitburnerFileSystemClientManager(connection);
  }

  static fromConnection(connection: ConnectionModel) {
    return BitburnerFileSystemClientManager.create(connection);
  }

  private constructor(
    public readonly connection: ConnectionModel,
  ) {}

  readDefinition(): Promise<string | undefined> {
    return this.connection.command(BitburnerCommands.definition, undefined);
  }

  names() {
    return this.connection.command(BitburnerCommands.names, { server: "home" });
  }

  list() {
    return this.connection.command(BitburnerCommands.list, { server: "home" });
  }

  remove(filename: string) {
    return this.connection.command(BitburnerCommands.remove, { server: "home", filename });
  }

  async removeMass(filenames: string[]) {
    const results = await Promise.all(filenames.map((filename) => this.remove(filename)));

    return ConnectionCommandError.find(results);
  }

  update(filename: string, content: string) {
    return this.connection.command(BitburnerCommands.update, { server: "home", filename, content });
  }

  async updateMass(files: { filename: string; content: string }[]) {
    const results = await Promise.all(files.map(({ filename, content }) => this.update(filename, content)));

    return ConnectionCommandError.find(results);
  }
}
