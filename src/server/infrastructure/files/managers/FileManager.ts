export class FileManager {
  static async listAllPaths({ path, recursive }: { path: string; recursive?: boolean }): Promise<string[]> {
    const paths: string[] = [];

    for await (const entry of Deno.readDir(path)) {
      const entryPath = `${path}/${entry.name}`;
      paths.push(entryPath);

      if (recursive && entry.isDirectory) {
        const subPaths = await FileManager.listAllPaths({ path: entryPath, recursive });

        paths.push(...subPaths);
      }
    }

    return paths;
  }
}
