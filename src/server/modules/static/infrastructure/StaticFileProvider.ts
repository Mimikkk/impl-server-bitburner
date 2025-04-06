import { FileReader } from "@server/infrastructure/files/FileReader.ts";
import { StaticResourceNs, StaticResourceUrl } from "@server/modules/static/infrastructure/StaticResourceUrl.ts";
import { resolve } from "@std/path/resolve";
import { StaticFileNs } from "../domain/StaticFile.ts";

export class StaticFileProvider {
  static create(): StaticFileProvider {
    return new StaticFileProvider();
  }

  private constructor(
    private readonly files = FileReader.create(),
  ) {}

  async read<P extends StaticFileNs.Path>(
    path: P,
  ): Promise<StaticFileNs.FileFromPath<P> | undefined> {
    if (StaticResourceNs.isUrl(path)) {
      path = this.fromUrl(path) as P;
    }

    const extensionIndex = path.lastIndexOf(".");
    if (extensionIndex === -1) return undefined;

    const extension = path.substring(extensionIndex + 1) as StaticFileNs.Extension;
    const type = StaticFileNs.TypeMap[extension];
    if (type === undefined) return undefined;

    const content = await this.files.read(path, type);
    if (content === undefined) return undefined;

    const mime = StaticFileNs.MimeMap[extension] ?? StaticFileNs.fallback;
    return { content, mime } as StaticFileNs.FileFromPath<P>;
  }

  async readUrl<U extends StaticResourceUrl>(url: U) {
    return await this.read(this.fromUrl(url));
  }

  private fromUrl<U extends StaticResourceUrl>(url: U): U {
    return resolve(this.directory, "resources", url) as U;
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname;
}
