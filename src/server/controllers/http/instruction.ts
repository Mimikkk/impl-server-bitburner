import { HtmlHttpResponse } from "@server/responses/HtmlHttpResponse.ts";
import { JsonHttpResponseCommon } from "@server/responses/JsonHttpResponseCommon.ts";
import { FileManager } from "@server/managers/FileManager.ts";

export const createInstructionResponse = async () => {
  const path = "src/server/controllers/http/instruction.template.html";
  const result = await FileManager.read(path);

  if (result === undefined) {
    return JsonHttpResponseCommon.nofile({ path });
  }

  return HtmlHttpResponse.success(result);
};
