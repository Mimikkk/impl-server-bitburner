export class FileService {
  static create() {
    return new FileService();
  }

  private constructor() {}

  async read(path: string): Promise<string | undefined> {
    try {
      return await Deno.readTextFile(path);
    } catch {
      return undefined;
    }
  }
}
