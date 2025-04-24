import { StaticService } from "@server/modules/static/application/services/StaticService.ts";
import { resolve } from "@std/path/resolve";
import { DocumentationAssetUrl } from "./DocumentationAssetUrl.ts";

export class DocumentationAssetProvider {
  static create(): DocumentationAssetProvider {
    return new DocumentationAssetProvider();
  }

  private constructor(
    private readonly staticService = StaticService.create(),
  ) {}

  read<Url extends DocumentationAssetUrl>(url: Url) {
    return this.staticService.read(this.path(url));
  }

  private path<Url extends DocumentationAssetUrl>(url: Url): Url {
    return resolve(this.directory, "assets", url) as Url;
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname;
}
