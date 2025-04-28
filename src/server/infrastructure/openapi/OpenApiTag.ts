import { TagObject } from "openapi3-ts/oas31";

export enum OpenApiTag {
  Instruction = "Instruction",
  Documentation = "Documentation",
  Connections = "Connections",
  Commands = "Commands",
  Static = "Static",
  Serverwide = "Serverwide",
}

export const OpenApiTags = new Map<OpenApiTag, TagObject>([
  [OpenApiTag.Serverwide, {
    name: OpenApiTag.Serverwide,
    description: "serverwide commands",
  }],
  [OpenApiTag.Instruction, {
    name: OpenApiTag.Instruction,
    description: "instructions to setup the server connection",
  }],
  [OpenApiTag.Documentation, {
    name: OpenApiTag.Documentation,
    description: "documentation for the server api",
  }],
  [OpenApiTag.Connections, {
    name: OpenApiTag.Connections,
    description: "bitburner connections",
  }],
  [OpenApiTag.Commands, {
    name: OpenApiTag.Commands,
    description: "bitburner commands",
  }],
  [OpenApiTag.Static, {
    name: OpenApiTag.Static,
    description: "static files",
  }],
]);
