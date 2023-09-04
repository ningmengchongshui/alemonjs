import { readdirSync, mkdirSync } from "fs";
import { join, dirname, basename } from "path";
import { setMessage } from "./message.js";
import { setApp } from "./app.js";
import { fileURLToPath } from "url";
/**
 * 得到执行路径
 * @param url
 * @returns
 */
export function getAppPath(url: string | URL) {
  return dirname(fileURLToPath(url)).replace(/\\/g, "/");
}
/**
 * 得到执行目录
 * @param {} url
 * @returns
 */
export function getAppName(url: string | URL) {
  return basename(getAppPath(url));
}
/**
 * 递归得到所有文件绝对路径
 * @param dirPath 指定目录下
 * @returns
 */
export function getAllJsAndTsFilesSync(dirPath) {
  const files: any = [];
  const entries = readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllJsAndTsFilesSync(fullPath));
    } else if (entry.isFile() && /\.(js|ts)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}
/**
 * 集成工程
 * @param AppName 目录名
 * @param DirName 默认apps
 * @returns
 */
export const integration = async (AppName: string, DirName = "apps") => {
  /**
   * 根目录锁定
   */
  const RootPath = join(process.cwd(), "plugins", AppName);
  /**
   * 集成
   */
  const apps = {};
  /**
   * 重名控制器
   */
  let acount = 0;
  try {
    const filepath = join(RootPath, DirName);
    mkdirSync(filepath, { recursive: true });
    const arr = getAllJsAndTsFilesSync(filepath);
    for await (const AppDir of arr) {
      /**
       * 文件对象:对象中有多个class
       */
      const dirObject = await import(`file://${AppDir}`).catch((err) => {
        console.error(AppDir);
        console.error(err);
        return {};
      });
      for (const item in dirObject) {
        /**
         * 如果该导出是class
         */
        if (dirObject[item].prototype) {
          if (!Object.prototype.hasOwnProperty.call(apps, item)) {
            /**
             * 不重名
             */
            apps[item] = dirObject[item];
            continue;
          }
          while (true) {
            let keyName = `${item}$${acount}`;
            if (!Object.prototype.hasOwnProperty.call(apps, keyName)) {
              /**
               * 不重名
               */
              apps[keyName] = dirObject[item];
              /**
               * 重置为0
               */
              acount = 0;
              break;
            } else {
              /**
               * 加1
               */
              acount++;
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return apps;
};

/**
 * 创建应用对象
 * @param AppName
 * @returns
 */
export function createApp(AppName: string) {
  /**
   * 应用集
   */
  const apps: object = {};
  /**
   * 重名控制器
   */
  let acount = 0;
  return {
    setMessage: (fnc: Function) => {
      try {
        setMessage(AppName, fnc);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    /**
     * 创建应用
     * @param app 应用对象
     */
    component: (dirObject: object = {}) => {
      try {
        for (let item in dirObject) {
          /**
           * 如果该导出是class
           */
          if (dirObject[item].prototype) {
            if (!Object.prototype.hasOwnProperty.call(apps, item)) {
              /**
               * 不重名
               */
              apps[item] = dirObject[item];
              continue;
            }
            while (true) {
              let keyName = `${item}$${acount}`;
              if (!Object.prototype.hasOwnProperty.call(apps, keyName)) {
                /**
                 * 不重名
                 */
                apps[keyName] = dirObject[item];
                /**
                 * 重置为0
                 */
                acount = 0;
                break;
              } else {
                /**
                 * 加1
                 */
                acount++;
              }
            }
          }
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    /**
     * 挂起应用
     * @returns
     */
    mount: () => {
      try {
        setApp(AppName, apps);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  };
}
