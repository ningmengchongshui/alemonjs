import {
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
  readFileSync,
} from "fs";
import { join } from "path";
import lodash from "lodash";
import { AMessage, CmdType, CmdItemType, EventEnum } from "./typings.js";
import { getMessage } from "./message.js";
import { getApp, delApp, getAppKey } from "./app.js";
import { conversationHandlers, getConversationState } from "./dialogue.js";

/**
 * 指令合集
 */
const Command: CmdType = {} as CmdType;
/**
 * example插件集合
 */
let ExampleArr = [];
/**
 * plugins插件集合
 */
let PluginsArr = [];

let plugins: object = {};

export function getPluginHelp(AppName: string) {
  // 地址
  const basePath = join(process.cwd(), "plugins", AppName, `${AppName}.json`);
  return JSON.parse(readFileSync(basePath, "utf8"));
}

/**
 * 应用挂载
 * @param AppsObj
 * @param appname
 * @param belong
 */
async function synthesis(AppsObj: object, appname: string, belong: string) {
  for (const item in AppsObj) {
    let keys = new AppsObj[item]();
    /**
     * 不合法
     */
    if (
      !keys["rule"] ||
      !Array.isArray(keys["rule"]) ||
      keys["rule"].length == 0
    ) {
      continue;
    }
    /**
     * 指令不存在
     */
    for await (const key of keys["rule"]) {
      if (
        !key["fnc"] ||
        !key["reg"] ||
        typeof keys[key["fnc"]] !== "function"
      ) {
        /**
         * 函数指定不存在,正则不存在
         * 得到的不是函数
         */
        continue;
      }
      if (typeof key["reg"] === "string" || key["reg"] instanceof RegExp) {
        const event = keys["event"] ?? "MESSAGE";
        const eventType = keys["eventType"] ?? "CREATE";
        const priority = keys["priority"] ?? 9999;
        const fncName = key["fnc"];
        const fnc = keys[fncName];
        const reg = key["reg"];
        const doc = key["doc"] ?? "";
        const dsc = key["dsc"] ?? "";
        /**
         * json记录
         */
        if (belong == "plugins") {
          if (!plugins[appname]) {
            plugins[appname] = [];
          }
          plugins[appname].push({
            event: event,
            eventType: eventType,
            reg,
            priority,
            doc,
            dsc,
          });
        }
        /**
         * 保存
         */
        Command[event].push({
          belong,
          event: event,
          eventType: eventType,
          reg,
          priority,
          fncName,
          fnc,
          AppName: appname,
        });
      }
    }
  }
  return;
}

/**
 * 加载简单插件
 * @param dir
 */
async function loadExample(dir: string) {
  /**
   * 初始化
   */
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  /**
   * 读取文件
   */
  const readDir = readdirSync(dir);
  /**
   * 正则匹配ts文件并返回
   */
  const flies = readDir.filter((item) => /.(ts|js)$/.test(item));
  /**
   * 所有的子插件集成
   */
  for await (let appname of flies) {
    if (!existsSync(`${dir}/${appname}`)) {
      continue;
    }
    /**
     * 得到插件名
     */
    const AppName = appname.replace(/\.(ts|js)$/, "");
    const apps = {};
    const Program = await import(`file://${dir}/${appname}`).catch((err) => {
      console.error(`file://${dir}/${appname}`);
      console.error(err);
      return {};
    });
    for (const item in Program) {
      if (Program[item].prototype) {
        apps[item] = Program[item];
      }
    }
    await synthesis(apps, AppName, "example");
    ExampleArr.push(AppName);
  }
  return;
}

/**
 * 加载应用插件
 * @param dir
 */
async function loadPlugins(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  let flies = readdirSync(dir);
  /**
   * 识别并执行插件
   */
  for await (let appname of flies) {
    if (existsSync(`${dir}/${appname}/index.ts`)) {
      /**
       * 优先考虑ts
       */
      await import(`file://${dir}/${appname}/index.ts`).catch((err) => {
        console.error(`file://${dir}/${appname}/index.ts`);
        console.error(err);
        process.exit();
      });
    } else if (existsSync(`${dir}/${appname}/index.js`)) {
      /**
       * 允许js写法
       */
      await import(`file://${dir}/${appname}/index.js`).catch((error) => {
        console.error(`file://${dir}/${appname}/index.js`);
        console.error(error);
        process.exit();
      });
    }
  }
  const APPARR = getAppKey();
  /**
   * 获取插件方法
   */
  for await (let item of APPARR) {
    const apps = getApp(item);
    await synthesis(apps, item, "plugins");
    PluginsArr.push(item);
    delApp(item);
  }
  return;
}

/**
 * 初始化应用
 */
function dataInit() {
  ExampleArr = [];
  PluginsArr = [];
  for (const item in EventEnum) {
    if (isNaN(Number(item))) {
      Command[item] = [];
    }
  }
  return;
}

/**
 * 启动加载
 */
export async function cmdInit() {
  dataInit();
  await loadPlugins(join(process.cwd(), "/plugins"));
  await loadExample(join(process.cwd(), "/example"));
  /**
   * 排序
   */
  for (const val in Command) {
    Command[val] = lodash.orderBy(Command[val], ["priority"], ["asc"]);
  }

  /**
   * 生成指令集合
   */
  for (const item in plugins) {
    const basePath = join(process.cwd(), "plugins", item, `${item}.json`);
    const jsonData = JSON.stringify(plugins[item], null, 2);
    writeFileSync(basePath, jsonData, "utf-8");
  }

  console.info(
    `[LOAD] Plugins*${PluginsArr.length} Example*${ExampleArr.length}`
  );
  return;
}

/**
 * 得到插件信息
 * @param key 插件类型
 * @returns
 */
export async function getLoadMsg(key: "example" | "plugins") {
  return {
    example: () => ExampleArr,
    plugins: () => PluginsArr,
  }[key];
}

/**
 * 指令匹配
 * @param e
 * @returns
 */
export async function InstructionMatching(e: AMessage) {
  if (e.isRecall) return true;
  /**
   * 匹配不到事件
   */
  if (!Command[e.event]) return true;

  /**
   * 获取对话状态
   */
  const state = await getConversationState(e.user_id);

  /**
   * 获取对话处理函数
   */
  const handler = conversationHandlers.get(e.user_id);
  if (handler && state) {
    /**
     * 如果用户处于对话状态
     * 则调用对话处理函数
     */
    await handler(e, state);
    return true;
  }

  /**
   * 消息类型兼容层
   */
  const msgarr = ["MESSAGES"];
  if (e.event == "MESSAGES") {
    msgarr.push("message");
  }

  for await (let item of msgarr) {
    /**
     * 发现message
     */
    if (item == "message") {
      e.event = EventEnum.message;
      e.eventType = undefined;
    }
    /**
     * 循环所有指令
     */
    for await (let data of Command[e.event]) {
      if (data.reg === undefined) continue;
      if (!new RegExp(data.reg).test(e.msg)) continue;
      if (e.eventType != data.eventType) continue;
      try {
        const { fnc, AppName } = data;
        const AppFnc = getMessage(AppName);
        if (typeof AppFnc == "function") e = AppFnc(e);
        const res = await fnc(e)
          .then((res: boolean) => {
            console.info(
              `[${data.event}][${data.belong}][${data.AppName}][${
                data.fncName
              }][${true}]`
            );
            return res;
          })
          .catch((err: any) => {
            console.error(
              `[${data.event}][${data.belong}][${data.AppName}][${
                data.fncName
              }][${false}]`
            );
            console.error(err);
            return false;
          });
        if (res) break;
      } catch (err) {
        logErr(err, data);
        return false;
      }
    }
  }

  return true;
}

/**
 * 不匹配指令的方法
 * 只用匹配类型函数
 * @param e
 * @returns
 */
export async function typeMessage(e: AMessage) {
  if (!Command[e.event]) return true;
  for (const data of Command[e.event]) {
    if (e.eventType != data.eventType) continue;
    try {
      const { fnc, AppName } = data;
      const AppFnc = getMessage(AppName);
      if (typeof AppFnc == "function") e = AppFnc(e);
      const res = await fnc(e)
        .then((res: boolean) => {
          console.info(
            `[${data.event}][${data.belong}][${data.AppName}][${
              data.fncName
            }][${true}]`
          );
          return res;
        })
        .catch((err: any) => {
          console.error(
            `[${data.event}][${data.belong}][${data.AppName}][${
              data.fncName
            }][${false}]`
          );
          console.error(err);
          return false;
        });
      if (res) break;
    } catch (err) {
      logErr(err, data);
      return false;
    }
  }
  return true;
}

/**
 * 错误信息反馈
 * @param err
 * @param data
 */
function logErr(err: any, data: CmdItemType) {
  console.error(err);
  console.error(
    `[${data.event}][${data.belong}][${data.AppName}][${
      data.fncName
    }][${false}]`
  );
  return;
}
