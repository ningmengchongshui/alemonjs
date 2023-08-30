import { EventEnum, SuperType, EventType } from "./typings.js";
class plugin {
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
  event?: EventEnum;
  /**
   * 事件类型
   */
  eventType?: EventType;
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
   * @param name 类名标记  用于特殊需要时的唯一标记
   * @param dsc 类名描述   用于描述该类的主要作用
   * @param event 事件类型
   * @param eventType 消息类型
   * @param priority 优先级      数字越小优先级越高
   * @param rule.reg 命令正则      RegExp(rule.reg)
   * @param rule.fnc 命令执行方法    function
   * @param rule.doc 指令文档    doc
   */
  constructor({
    name = "your-name",
    dsc = "dsc",
    event = EventEnum.MESSAGES,
    eventType = EventType.CREATE,
    priority = 5000,
    rule = [],
  }: SuperType) {
    this.name = name;
    this.dsc = dsc;
    this.event = event;
    this.eventType = eventType;
    this.priority = priority;
    this.rule = rule;
  }
}
export { plugin };
