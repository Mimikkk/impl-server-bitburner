import { StaticService } from "@server/modules/static/application/services/StaticService.ts";
import { resolve } from "@std/path/resolve";
import { InstructionAssetUrl } from "../domain/InstructionAssetUrl.ts";

export class InstructionAssetProvider {
  static create(): InstructionAssetProvider {
    return new InstructionAssetProvider();
  }

  private constructor(
    private readonly staticService = StaticService.create(),
  ) {}

  read<Url extends InstructionAssetUrl>(url: Url) {
    return this.staticService.read(this.fromUrl(url));
  }

  private fromUrl<Url extends InstructionAssetUrl>(url: Url): Url {
    return resolve(this.directory, "../application/assets", url) as Url;
  }

  private readonly url = new URL(import.meta.dirname!);
  private readonly directory = this.url.pathname;
}
