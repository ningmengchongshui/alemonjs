import { readFileSync, writeFileSync, watch, mkdirSync } from "fs";
import { join } from "path";
import template from "art-template";
import lodash from "lodash";
import { screenshot } from "./puppeteer.js";
import { PictureOptions } from "./typings.js";

/**
 * 模板缓存
 */
const html = {};

/**
 * 监听器
 */
const watcher = {};

/**
 * 地址缓存
 */
const AdressCache = {};

/**
 * 缓存监听
 * @param tplFile 模板地址
 * @returns
 */
function watchCT(tplFile: string) {
  /**
   * 监听存在,直接返回
   */
  if (watcher[tplFile]) return;
  /**
   * 监听不存在,增加监听
   */
  watcher[tplFile] = watch(tplFile)
    .on("change", () => {
      /**
       * 模板改变,删除模板
       */
      delete html[tplFile];
      console.info("[HTML][UPDATA]", tplFile);
    })
    .on("close", () => {
      /**
       * 监听器被移除,删除监听器
       */
      delete watcher[tplFile];
    });
}

/**
 *
 * @param Options
 * @returns
 */
export async function createPicture(
  Options: PictureOptions
): Promise<string | false | Buffer> {
  const {
    AppName,
    tplFile,
    PageName,
    data,
    directory,
    SOptions = { type: "jpeg", quality: 90 },
  } = Options;
  /**
   * 插件路径
   */
  const basePath = join(process.cwd(), "plugins", AppName);

  /**
   * 创建目录地址
   */
  const PathHtml = join(basePath, "html", directory);

  /**
   * 创建文件地址
   */
  const AdressHtml = join(PathHtml, `/${PageName}.html`);

  /**
   * 确保目录存在
   */
  mkdirSync(PathHtml, { recursive: true });

  /**
   * 判断初始模板是否改变
   *
   */
  let T = false;

  if (!html[tplFile]) {
    try {
      /**
       * 如果不存在,则读取模板
       */
      html[tplFile] = readFileSync(tplFile, "utf8");
    } catch (err) {
      console.error("[HTML][ERROR]", tplFile, err);
      return false;
    }
    /**
     * 读取后监听文件
     */
    watchCT(tplFile);
    T = true;
  }

  /**
   * 需要更新数据
   */
  if (!lodash.isEqual(AdressCache[AdressHtml], data)) {
    AdressCache[AdressHtml] = data;
    T = true;
  }

  /**
   * 模板更改和数据更改都会生成生成html
   */
  if (T) {
    const basePath = join(process.cwd(), "plugins", AppName);
    //
    const reg =
      /url\(['"](@[^'"]+)['"]\)|href=['"](@[^'"]+)['"]|src=['"](@[^'"]+)['"]/g;
    //
    const absolutePathTemplate = html[tplFile].replace(
      reg,
      (match, urlPath, hrefPath, srcPath) => {
        const relativePath = urlPath ?? hrefPath ?? srcPath;
        // 去掉路径开头的 @ 符号
        // 转义\/
        const absolutePath = join(basePath, relativePath.substr(1)).replace(
          /\\/g,
          "/"
        );
        if (urlPath) return `url('${absolutePath}')`;
        if (hrefPath) return `href='${absolutePath}'`;
        if (srcPath) return `src='${absolutePath}'`;
      }
    );
    /**
     * 写入模板
     */
    writeFileSync(
      AdressHtml,
      template.render(absolutePathTemplate, AdressCache[AdressHtml])
    );
    /**
     * 打印反馈
     */
    console.info("[HTML][CREATE]", AdressHtml);
  }

  /**
   * 截图
   */
  return await screenshot(AdressHtml, SOptions).catch((err: any) => {
    console.error(err);
    return false;
  });
}
