import { DocumentationAssetProvider } from "../../infrastructure/DocumentationAssetProvider.ts";
import { DocumentationAssetUrl } from "../../infrastructure/DocumentationAssetUrl.ts";

export class DocumentationService {
  static create(): DocumentationService {
    return new DocumentationService();
  }

  private constructor(
    private readonly provider = DocumentationAssetProvider.create(),
  ) {}

  read<Url extends DocumentationAssetUrl>(url: Url) {
    return this.provider.read(url);
  }
}
