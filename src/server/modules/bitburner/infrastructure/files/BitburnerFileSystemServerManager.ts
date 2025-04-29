import { FileSystemManager } from "@server/infrastructure/files/managers/FileSystemManager.ts";
import { resolve } from "@std/path/resolve";

export class BitburnerFileSystemServerManager {
  static create() {
    return new BitburnerFileSystemServerManager();
  }

  private constructor(
    private readonly manager = FileSystemManager.create("src/client"),
  ) {}

  names() {
    return this.manager.list({ path: "servers/home", recursive: true });
  }

  async clear() {
    const directory = resolve("src/client/servers/home");
    try {
      await Deno.remove(directory, { recursive: true });
      await Deno.mkdir(directory, { recursive: true });
    } catch {
      return undefined;
    }
  }

  async list() {
    const names = await this.names();

    const contents = await Promise.all(
      names.map((filename) => this.manager.readStr(`servers/home/${filename}`)),
    ) as string[];

    return names.map((filename, index) => ({ filename, content: contents[index] }));
  }

  async updateDefinition(content: string): Promise<boolean> {
    return await this.manager.write("declaration.d.ts", content);
  }

  update(filename: string, content: string) {
    return this.manager.write(`servers/home/${filename}`, content);
  }

  async updateMass(files: { filename: string; content: string }[]) {
    const results = await Promise.all(files.map((file) => this.update(file.filename, file.content)));

    return results.some((result) => !result);
  }
}
