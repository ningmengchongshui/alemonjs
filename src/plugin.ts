import { EventEnum, EventType } from "./typings.js";
export class plugin {
  /**
   * 模块名
   */
  name?: string;
  /**
   * 模块说明
   */
  dsc?: string;
  /**
   * 事件枚举
   */
  event?: (typeof EventEnum)[number];
  /**
   * 事件类型
   */
  eventType?: (typeof EventType)[number];
  /**
   * 匹配优先级
   */
  priority?: number;
  /**
   * 匹配集
   */
  rule?: {
    /**
     * 正则
     */
    reg?: RegExp | string;
    /**
     * 方法(函数)
     */
    fnc: string;
    /**
     * 指令示范
     */
    dsc?: string;
    /**
     * 指令文档
     */
    doc?: string;
  }[];
  /**
   * @param name 类名标记
   * @param dsc 类名描述
   * @param event 事件类型
   * @param eventType 消息类型
   * @param priority 优先级      数字越小优先级越高
   * @param rule.reg 命令正则    RegExp | string
   * @param rule.fnc 命令函数    function
   * @param rule.dsc 指令示范    sdc
   * @param rule.doc 指令文档    doc
   */
  constructor({
    name = "your-name",
    dsc = "dsc",
    event = "MESSAGES",
    eventType = "CREATE",
    priority = 5000,
    rule = [],
  }: {
    name?: string;
    dsc?: string;
    event?: (typeof EventEnum)[number];
    eventType?: (typeof EventType)[number];
    priority?: number;
    rule?: {
      reg?: RegExp | string;
      fnc: string;
      dsc?: string;
      doc?: string;
    }[];
  }) {
    this.name = name;
    this.dsc = dsc;
    this.event = event;
    this.eventType = eventType;
    this.priority = priority;
    this.rule = rule;
  }
}
