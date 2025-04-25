import { DocumentationGenerator } from "@server/modules/documentation/infrastructure/DocumentationGenerator.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";

export namespace HttpDocumentationResponse {
  export const [Content, content] = HttpJsonResponse.content({
    example: DocumentationGenerator.initial,
    description: "The OpenAPI specification",
    name: "OpenAPI Specification",
    schema: { type: "object" },
  });
}
