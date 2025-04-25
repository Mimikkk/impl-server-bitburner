import { PathParameterStore } from "@server/presentation/messaging/http/parameters/PathParameterStore.ts";
import { ParameterObject, SchemaObject } from "openapi3-ts/oas31";

export class PathParameter {
  static create({ name, example, description, type, format }: PathParameter.Options): PathParameter {
    const parameter = new PathParameter(name, example, description, type, format);

    PathParameterStore.instance.add(parameter);

    return parameter;
  }

  static integer({ name, example = "1", description }: PathParameter.IntegerOptions): PathParameter {
    return this.create({ name, example, description, type: "integer", format: "int32" });
  }

  static string({ name, example = "text", description }: PathParameter.StringOptions): PathParameter {
    return this.create({ name, example, description, type: "string" });
  }

  static number({ name, example = "1.0", description }: PathParameter.NumberOptions): PathParameter {
    return this.create({ name, example, description, type: "number", format: "float" });
  }

  static boolean({ name, example = "true", description }: PathParameter.BooleanOptions): PathParameter {
    return this.create({ name, example, description, type: "boolean" });
  }

  private constructor(
    public readonly name: string,
    public readonly example: string,
    public readonly description: string,
    public readonly type: SchemaObject["type"],
    public readonly format: SchemaObject["format"],
  ) {}

  toString(): string {
    return `{${this.name}:${this.type}}`;
  }

  toObject(): ParameterObject {
    return {
      name: `${this.name}:${this.type}`,
      example: this.example,
      description: this.description,
      schema: { type: this.type, format: this.format },
      in: "path",
    };
  }
}

export namespace PathParameter {
  export interface Options {
    name: string;
    example: string;
    description: string;
    type: SchemaObject["type"];
    format?: SchemaObject["format"];
  }

  export interface IntegerOptions {
    name: string;
    example?: string;
    description: string;
  }

  export interface StringOptions {
    name: string;
    example?: string;
    description: string;
  }

  export interface NumberOptions {
    name: string;
    example?: string;
    description: string;
  }

  export interface BooleanOptions {
    name: string;
    example?: string;
    description: string;
  }
}
