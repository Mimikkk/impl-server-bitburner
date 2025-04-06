import { FileReader } from "@server/infrastructure/files/FileReader.ts";
import { resolve } from "@std/path/resolve";
import { DocumentationResourceUrl } from "./DocumentationResourceUrl.ts";

export class DocumentationResourceProvider {
  static create(): DocumentationResourceProvider {
    return new DocumentationResourceProvider();
  }

  private constructor(
    private readonly files = FileReader.create(),
  ) {}

  async read(documentation: DocumentationResourceUrl): Promise<string | undefined> {
    return await this.files.read(this.path(documentation));
  }

  private path(documentation: DocumentationResourceUrl): string {
    return resolve(this.directory, "resources", documentation);
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname.replace("index.ts", "");
}
