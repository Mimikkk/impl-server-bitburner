import { StaticFileProvider } from "../../infrastructure/StaticFileProvider.ts";

export class StaticService {
  static create(): StaticService {
    return new StaticService();
  }

  private constructor(
    private readonly provider = StaticFileProvider.create(),
  ) {}

  read = function (this: StaticService, url) {
    return this.provider.read(url);
  } as StaticFileProvider["read"];
}
