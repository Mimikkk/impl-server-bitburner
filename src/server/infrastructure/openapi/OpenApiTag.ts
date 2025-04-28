import { TagObject } from "openapi3-ts/oas31";

export enum OpenApiTag {
  Instruction = "Instruction (internal)",
  Documentation = "Documentation (internal)",
  Static = "Static (internal)",
  Connections = "Connections",
  Commands = "Commands",
  Serverwide = "Serverwide commands",
  Manual = "Manual commands",
}

export const OpenApiTags = new Map<OpenApiTag, TagObject>([
  [OpenApiTag.Manual, {
    name: OpenApiTag.Manual,
    description: "manual commands",
  }],
  [OpenApiTag.Serverwide, {
    name: OpenApiTag.Serverwide,
    description: "serverwide commands",
  }],
  [OpenApiTag.Connections, {
    name: OpenApiTag.Connections,
    description: "active bitburner connections",
  }],
  [OpenApiTag.Commands, {
    name: OpenApiTag.Commands,
    description: "available bitburner commands",
  }],
  [OpenApiTag.Instruction, {
    name: OpenApiTag.Instruction,
    description: "instructions to setup the server connection",
  }],
  [OpenApiTag.Documentation, {
    name: OpenApiTag.Documentation,
    description: "documentation for the server api",
  }],
  [OpenApiTag.Static, {
    name: OpenApiTag.Static,
    description: "static files",
  }],
]);
export const OpenApiTagOrder = new Map<OpenApiTag, number>([
  OpenApiTag.Serverwide,
  OpenApiTag.Manual,
  OpenApiTag.Connections,
  OpenApiTag.Commands,
  OpenApiTag.Instruction,
  OpenApiTag.Documentation,
  OpenApiTag.Static,
].map((item, index) => [item, index]));
