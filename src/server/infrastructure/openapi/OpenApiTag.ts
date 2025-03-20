import { TagObject } from "openapi3-ts/oas31";

export enum OpenApiTag {
  Template = "template",
}

export const OpenApiTags: TagObject[] = [
  {
    name: OpenApiTag.Template,
    description: "html templates",
  },
];
