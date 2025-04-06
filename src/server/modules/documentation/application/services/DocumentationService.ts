import { DocumentationResourceProvider } from "@server/modules/documentation/infrastructure/DocumentationResourceProvider.ts";
import { DocumentationResourceUrl } from "@server/modules/documentation/infrastructure/DocumentationResourceUrl.ts";

export class DocumentationService {
  static create(): DocumentationService {
    return new DocumentationService();
  }

  private constructor(
    private readonly provider = DocumentationResourceProvider.create(),
  ) {}

  read<Url extends DocumentationResourceUrl>(url: Url) {
    return this.provider.read(url);
  }
}
