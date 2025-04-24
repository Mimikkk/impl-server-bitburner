import { StaticService } from "@server/modules/static/application/services/StaticService.ts";
import { resolve } from "@std/path/resolve";
import { DocumentationResourceUrl } from "./DocumentationResourceUrl.ts";

export class DocumentationResourceProvider {
  static create(): DocumentationResourceProvider {
    return new DocumentationResourceProvider();
  }

  private constructor(
    private readonly staticService = StaticService.create(),
  ) {}

  read<Url extends DocumentationResourceUrl>(url: Url) {
    return this.staticService.read(this.path(url));
  }

  private path<Url extends DocumentationResourceUrl>(url: Url): Url {
    return resolve(this.directory, "../application/assets", url) as Url;
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname;
}
