import { Template } from "@server/services/templates/template.enum.ts";
import { resolve } from "@std/path";

export namespace TemplateService {
  const url = new URL(import.meta.dirname!);
  const directory = url.pathname.replace("index.ts", "");

  export const path = (template: Template): string => resolve(directory, "files", template);
}
