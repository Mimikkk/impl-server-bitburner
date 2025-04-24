import { StaticService } from "@server/modules/static/application/services/StaticService.ts";
import { resolve } from "@std/path/resolve";
import { InstructionResourceUrl } from "./InstructionResourceUrl.ts";

export class InstructionResourceProvider {
  static create(): InstructionResourceProvider {
    return new InstructionResourceProvider();
  }

  private constructor(
    private readonly staticService = StaticService.create(),
  ) {}

  read<Url extends InstructionResourceUrl>(url: Url) {
    return this.staticService.read(this.fromUrl(url));
  }

  private fromUrl<Url extends InstructionResourceUrl>(url: Url): Url {
    return resolve(this.directory, "../application/assets", url) as Url;
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname;
}
