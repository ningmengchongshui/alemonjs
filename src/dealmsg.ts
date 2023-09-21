import {
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
  readFileSync,
} from "fs";
import { join } from "path";
import lodash from "lodash";
import { AMessage, EventType, EventEnum } from "./typings.js";
import { getMessage } from "./message.js";
import { getApp, delApp, getAppKey } from "./app.js";
import { conversationHandlers, getConversationState } from "./dialogue.js";

/**
 * 指令可枚举类型
 */
interface CmdItemType {
  reg: RegExp | string;
  priority: number;
  event: (typeof EventEnum)[number];
  eventType: (typeof EventType)[number];
  belong: "plugins" | "example";
  AppName: string;
  fncName: string;
  fnc: Function;
}

/**
 * 指令类型
 */
type CmdType = {
  [Event in (typeof EventEnum)[number]]: CmdItemType[];
};

/**
 * 指令合集
 */
const Command: CmdType = {} as CmdType;

/**
 * plugins插件集合
 */
let PluginsArr = [];

/**
 * 指令json
 */
let plugins: object = {};

/**
 * 默认执行地址
 */
let route = '/help'

/**
 * 执行文件 
 */
let addressMenu = join(process.cwd(), route)

/**
 * 设置指令json地址
 * @param rt = '/src' 
 */
export function setAppsHelp(rt = route) {
  addressMenu = join(process.cwd(), rt)
}

/**
 * 得到机器人帮助
 * @param AppName 
 * @returns 
 */
export function getPluginHelp(AppName: string) {
  // 放到src目录下？
  const basePath = join(addressMenu, `${AppName}.json`);
  return JSON.parse(readFileSync(basePath, "utf8"));
}

/**
 * 创建机器人帮助
 */
function createPluginHelp() {
  // 不存在
  if (!existsSync(addressMenu)) mkdirSync(addressMenu, { recursive: true });
  // 创建help
  for (const item in plugins) {
    const basePath = join(addressMenu, `${item}.json`);
    const jsonData = JSON.stringify(plugins[item], null, 2);
    writeFileSync(basePath, jsonData, "utf-8");
  }
}

/**
 * 应用挂载
 * @param AppsObj
 * @param appname
 * @param belong
 */
async function synthesis(
  AppsObj: object,
  appname: string,
  belong: "plugins" | "example"
) {
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
        // 控制消息
        const event = keys["event"] ?? "MESSAGE";
        // 控制类型
        const eventType = keys["eventType"] ?? "CREATE";
        // 先看指令优先级,没有就看类优先级,再没有则默认优先级
        const priority = key["priority"] ?? keys["priority"] ?? 9000;
        // 得到函数名
        const fncName = key["fnc"];
        // 得到函数
        const fnc = keys[fncName];
        // 得到解析
        const reg = key["reg"];
        const doc = key["doc"] ?? "";
        const dsc = key["dsc"] ?? "";
        // 没有记载
        if (!plugins[appname]) {
          plugins[appname] = [];
        }
        // 推送
        plugins[appname].push({
          event: event,
          eventType: eventType,
          reg: String(reg),
          dsc,
          doc,
          priority,
        });
        // 保存
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
  return;
}

/**
 * 初始化应用
 */
function dataInit() {
  PluginsArr = [];
  for (const item of EventEnum) {
    if (isNaN(Number(item))) {
      Command[item] = [];
    }
  }
  return;
}


/**
 * 应用初始化
 * @returns 
 */
export async function appsInit() {
  /**
   * 清空当前的apps
   */
  dataInit();
  /**
   * 得到所有插件名
   */
  const APPARR = getAppKey();
  /**
   * 导出所有插件名
   */
  for await (let item of APPARR) {
    /**
     * 获取插件集
     */
    const apps = getApp(item);
    /**
     * 分析插件集
     */
    await synthesis(apps, item, "plugins");
    /**
     * 记录该插件
     */
    PluginsArr.push(item);
    /**
     * 删除指集
     */
    delApp(item);
  }

  /**
   * 排序
   */
  for (const val in Command) {
    Command[val] = lodash.orderBy(Command[val], ["priority"], ["asc"]);
  }
  /**
   * 生成指令json
   */
  createPluginHelp()
  /**
   * 打印
   */
  console.info(
    `[LOAD] Plugins*${PluginsArr.length} `
  );
  return
}

/**
 * 加载初始化
 * @param T 
 * @returns 
 */
export async function cmdInit(T = true) {
  /**
   * 加载插件
   */
  await loadPlugins(join(process.cwd(), "/plugins"));
  /**
   * 取消集成
   */
  if (T) await appsInit()
  return;
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
      e.event = "message";
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
              `\n[${data.event}][${data.belong}][${data.AppName}][${data.fncName
              }][${true}]`
            );
            return res;
          })
          .catch((err: any) => {
            console.error(err);
            console.error(
              `\n[${data.event}][${data.belong}][${data.AppName}][${data.fncName
              }][${false}]`
            );
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
            `\n[${data.event}][${data.belong}][${data.AppName}][${data.fncName
            }][${true}]`
          );
          return res;
        })
        .catch((err: any) => {
          console.error(err);
          console.error(
            `\n[${data.event}][${data.belong}][${data.AppName}][${data.fncName
            }][${false}]`
          );
          return false;
        });
      if (res) {
        break;
      }
    } catch (err) {
      logErr(err, data);
      continue;
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
    `\n[${data.event}][${data.belong}][${data.AppName}][${data.fncName
    }][${false}]`
  );
  return;
}
