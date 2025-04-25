import { TagObject } from "openapi3-ts/oas31";

export enum OpenApiTag {
  Instruction = "Instruction",
  Documentation = "Documentation",
}

export const OpenApiTags = new Map<OpenApiTag, TagObject>([
  [OpenApiTag.Instruction, {
    name: OpenApiTag.Instruction,
    description: "instructions to setup the server connection.",
  }],
  [OpenApiTag.Documentation, {
    name: OpenApiTag.Documentation,
    description: "documentation for the server api.",
  }],
]);
