import { typeMessage, AMessage } from '../../../core/index.js'
import { mergeMessages } from './MESSAGE.js'
import { EventData } from '../types.js'
import { getBotMsgByQQ } from '../bot.js'
import { AlemonJSEventError, AlemonJSEventLog } from '../../../log/event.js'

/**
 * *
 * 公域
 * *
 */

/**
 * 错误打印
 * @param err
 * @returns
 */
const error = err => {
  console.error(err)
  return err
}

/**
 PUBLIC_GUILD_MESSAGES (1 << 30) // 消息事件，此为公域的消息事件
 AT_MESSAGE_CREATE       // 当收到@机器人的消息时
 PUBLIC_MESSAGE_DELETE   // 当频道的消息被删除时
 */
export const PUBLIC_GUILD_MESSAGES = async (event: EventData) => {
  const e = {
    platform: 'qq',
    bot: getBotMsgByQQ(),
    event: 'MESSAGES',
    eventType: 'CREATE',
    isPrivate: false,
    isRecall: false,
    isGroup: true // 群聊
  } as AMessage

  /**
   * 消息撤回
   */
  if (new RegExp(/DELETE$/).test(event.eventType)) {
    e.eventType = 'DELETE'
    e.isRecall = true
    return await typeMessage(e)
      .then(() => AlemonJSEventLog(e.event, e.eventType))
      .catch(err => AlemonJSEventError(err, e.event, e.eventType))
    return
  }

  /**
   * 消息创建
   */
  if (new RegExp(/CREATE$/).test(event.eventType)) {
    mergeMessages(e as AMessage, event).catch(error)
    return
  }
}
