export namespace FileService {
  export const read = async (path: string): Promise<string | undefined> => {
    try {
      return await Deno.readTextFile(path);
    } catch (error) {
      return undefined;
    }
  };
}
