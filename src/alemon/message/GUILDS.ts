import { Messagetype, EventType, EType, typeMessage } from 'alemon'
import { BotEvent } from '../types.js'
/**
 * 机器人进出
 * @param event 回调数据
 * @param val  类型控制
 */
export async function GUILDS(event: BotEvent, val: number) {
  console.log('GUILDS=', event) // 消息类型
  console.log('GUILDS=', event.robot.template) // 机器人信息
  console.log('GUILDS=data=', event.extend_data.EventData) //
  /** 制作e消息对象 */
  const e = {
    /** 消息编号 */
    eventId: event.id,
    /** 事件类型 */
    event: EType.MESSAGES,
    /** 消息类型  */
    eventType: val == 3 ? EventType.CREATE : EventType.DELETE,
    /**  消息对象 */
    msg: {
      channel_id: '', // 房间
      author: {
        id: '', // 用户编号
        username: '', // 用户名
        bot: false, // 是否是bot
        avatar: '' // 头像
      },
      content: '' // 指令消息
    },
    /** 是否是私域 */
    isPrivate: false,
    /** 是否是群聊 */
    isGroup: true,
    /**  是否是撤回 */
    isRecall: false,
    /** 艾特得到的qq */ // 忽略机器人
    atuid: [],
    /** 是否是艾特 */
    at: false,
    /** 是否是机器人主人 */
    isMaster: false,
    /** 去除了艾特后的消息 */
    cmd_msg: ''
  }
  //只匹配类型
  await typeMessage(e as Messagetype)
    .then(() => {
      console.info(`\n[${e.event}] [${e.eventType}]\n${true}`)
      return true
    })
    .catch(err => {
      console.log(err)
      console.info(`\n[${e.event}] [${e.eventType}]\n${false}`)
      return false
    })
}