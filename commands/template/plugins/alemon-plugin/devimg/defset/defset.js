import { readFileSync } from "node:fs";
import { resolve } from "node:path";
export function getConfig(name) {
  /* 读取配置 */
  return JSON.parse(
    readFileSync(
      `${resolve().replace(/\\/g, "/")}/resources/defset/${name}.json`,
      "utf8"
    )
  );
}
