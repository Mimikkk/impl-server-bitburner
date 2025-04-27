import { PathParameterStore } from "@server/presentation/messaging/http/parameters/PathParameterStore.ts";
import { ParameterObject, SchemaObject } from "openapi3-ts/oas31";

export class PathParameter {
  static create({ name, example, description, type, format, options }: PathParameter.Options): PathParameter {
    const parameter = new PathParameter(name, example, description, type, format, options);

    PathParameterStore.instance.add(parameter);

    return parameter;
  }

  static integer(
    { name, options, example = options?.[0] ?? "1", description }: PathParameter.IntegerOptions,
  ): PathParameter {
    return this.create({ name, example, description, type: "integer", format: "int32", options });
  }

  static string(
    { name, options, example = options?.[0] ?? "text", description }: PathParameter.StringOptions,
  ): PathParameter {
    return this.create({ name, example, description, type: "string", options });
  }

  static number(
    { name, options, example = options?.[0] ?? "1.0", description }: PathParameter.NumberOptions,
  ): PathParameter {
    return this.create({ name, example, description, type: "number", format: "float", options });
  }

  static boolean(
    { name, options, example = options?.[0] ?? "true", description }: PathParameter.BooleanOptions,
  ): PathParameter {
    return this.create({ name, example, description, type: "boolean", options });
  }

  private constructor(
    public readonly name: string,
    public readonly example: string,
    public readonly description: string,
    public readonly type: SchemaObject["type"],
    public readonly format: SchemaObject["format"],
    public readonly options: string[] | undefined,
  ) {}

  toString(): string {
    return `{${this.name}:${this.type}}`;
  }

  toObject(): ParameterObject {
    return {
      name: `${this.name}:${this.type}`,
      example: this.example,
      description: this.description,
      schema: { type: this.type, format: this.format, enum: this.options },
      in: "path",
      required: true,
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
    options?: string[];
  }

  export interface IntegerOptions {
    name: string;
    example?: string;
    description: string;
    options?: string[];
  }

  export interface StringOptions {
    name: string;
    example?: string;
    description: string;
    options?: string[];
  }

  export interface NumberOptions {
    name: string;
    example?: string;
    description: string;
    options?: string[];
  }

  export interface BooleanOptions {
    name: string;
    example?: string;
    description: string;
    options?: string[];
  }
}
