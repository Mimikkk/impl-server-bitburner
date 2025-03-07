export namespace FileManager {
  export const read = async (path: string): Promise<string | undefined> => {
    try {
      return await Deno.readTextFile(Deno.cwd() + "/" + path);
    } catch (error) {
      return undefined;
    }
  };
}
