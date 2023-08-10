import { readFileSync } from "node:fs";
import template from "art-template";
export function dealTpl(data) {
  let { tplFile } = data;
  try {
    const tpl = readFileSync(tplFile, "utf8");
    return template.render(tpl, data);
  } catch (err) {
    console.info(`[加载html错误]${tplFile}`);
    return false;
  }
}
