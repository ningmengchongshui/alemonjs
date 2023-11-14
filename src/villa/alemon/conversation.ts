import { MESSAGES } from './message/MESSAGES.js'
import { GUILD_MEMBERS } from './message/GUILD_MEMBERS.js'
import { GUILD_MESSAGE_REACTIONS } from './message/GUILD_MESSAGE_REACTIONS.js'
import { MESSAGE_AUDIT } from './message/MESSAGE_AUDIT.js'
import { GUILD_BOT } from './message/GUILD_BOT.js'
/**
 * 事件处理集
 */
const ConversationMap = {
  /**
   * 房间消息--成员进入
   */
  [1]: GUILD_MEMBERS,
  /**
   * 会话消息
   */
  [2]: MESSAGES,
  /**
   * 别野消息--机器人进入
   */
  [3]: GUILD_BOT,
  /**
   * 别野消息--机器人退出
   */
  [4]: GUILD_BOT,
  /**
   *  表情表态
   */
  [5]: GUILD_MESSAGE_REACTIONS,
  /**
   *  审核事件
   */
  [6]: MESSAGE_AUDIT
}
/**
 * 消息接收入口
 * @param req
 * @param res
 */
export async function callBackByVilla(event) {
  if (Object.prototype.hasOwnProperty.call(ConversationMap, event.type)) {
    return await ConversationMap[event.type](event)
  }
}
