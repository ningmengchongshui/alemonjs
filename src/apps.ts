import { readdirSync, mkdirSync } from "fs";
import { join } from "path";

// 非依赖引用
import { setApp, setMessage } from "./message.js";

/**
 * 递归得到所有js/ts文件绝对路径
 * @param dirPath 指定目录下
 * @returns
 */
export function getAllJsAndTsFilesSync(dirPath: string) {
  const files = [];
  const entries = readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      // 递归获取子目录中的文件路径
      files.push(...getAllJsAndTsFilesSync(fullPath));
    } else if (entry.isFile() && /\.(js|ts)$/i.test(entry.name)) {
      // 如果是以 .js 或 .ts 结尾的文件，则将其路径保存到数组中
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * 创建应用对象
 * @param AppName
 * @returns
 */
export function createApp(AppName: string) {
  /** 根目录锁定 */
  const RootPath = join(process.cwd(), "plugins", AppName);
  /**  集成 */
  const apps: object = {};
  return {
    setMessage: (fnc: Function) => {
      try {
        setMessage(AppName, fnc);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    /**
     * 加载应用
     * @param DirName
     * @returns
     */
    create: async (DirName: string) => {
      try {
        const filepath = join(RootPath, DirName);
        mkdirSync(filepath, { recursive: true });
        const arr = getAllJsAndTsFilesSync(filepath);
        for await (let AppDir of arr) {
          //文件对象:对象中有多个class
          const dirObject = await import(`file://${AppDir}`).catch((err) => {
            console.error(AppName);
            console.error(AppDir);
            console.error(err);
            return {};
          });
          for (let item in dirObject) {
            //如果该导出是class
            if (dirObject[item].prototype) {
              //如果没发现有
              if (apps.hasOwnProperty(item)) {
                console.error(`[同名class export]  ${AppDir}`);
              }
              apps[item] = dirObject[item];
            } else {
              console.error(`[非class export]  ${AppDir}`);
            }
          }
        }
        return true;
      } catch (err) {
        console.log(err);
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
          //如果该导出是class
          if (dirObject[item].prototype) {
            //如果没发现有
            if (apps.hasOwnProperty(item)) {
              console.error(`[同名class export]  ${item}`);
            }
            apps[item] = dirObject[item];
          } else {
            console.error(`[非class export]  ${item}`);
          }
        }
        return true;
      } catch (err) {
        console.log(err);
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
        console.log(err);
        return false;
      }
    },
  };
}

/**
 * 集成工程
 * @param AppName
 * @param DirName
 * @returns
 */
export async function integration(AppName: string, DirName = "apps") {
  /** 根目录锁定 */
  const RootPath = join(process.cwd(), "plugins", AppName);
  /**  集成 */
  const apps = {};
  try {
    const filepath = join(RootPath, DirName);
    mkdirSync(filepath, { recursive: true });
    const arr = getAllJsAndTsFilesSync(filepath);
    for await (const AppDir of arr) {
      //文件对象:对象中有多个class
      const dirObject = await import(`file://${AppDir}`).catch((err) => {
        console.error(AppName);
        console.error(AppDir);
        console.error(err);
        return {};
      });
      for (const item in dirObject) {
        //如果该导出是class
        if (dirObject[item].prototype) {
          //如果没发现有
          if (Object.prototype.hasOwnProperty.call(apps, item)) {
            console.error(`[同名class export]  ${AppDir}`);
          }
          apps[item] = dirObject[item];
        } else {
          console.error(`[非class export]  ${AppDir}`);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  return apps;
}