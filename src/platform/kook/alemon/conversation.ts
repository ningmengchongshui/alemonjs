import { PUBLIC_GUILD_MESSAGES_KOOK } from './message/PUBLIC_GUILD_MESSAGES.js'
import { MESSAGES } from './message/MESSAGES.js'
import { EventData, SystemData } from '../sdk/index.js'
import { REACTIONS } from './message/REACTIONS.js'
import { INTERACTION } from './message/INTERACTION.js'
import { GUILD_MEMBER_ADD } from './message/GUILD_MEMBER_ADD.js'
import { GUILD_MEMBER_REMOVE } from './message/GUILD_MEMBER_REMOVE.js'
import { loger } from '../../../log.js'
/**
 * 事件处理集
 */
const ConversationMap = {
  /**
   * 文字消息
   */
  [1]: {
    public: PUBLIC_GUILD_MESSAGES_KOOK,
    direct: MESSAGES
  },
  /**
   * 图片消息，
   */
  [2]: {
    public: PUBLIC_GUILD_MESSAGES_KOOK,
    direct: MESSAGES
  },
  /**
   * 视频消息，
   */
  [3]: {
    public: PUBLIC_GUILD_MESSAGES_KOOK,
    direct: MESSAGES
  },
  /**
   * 文件消息，
   */
  [4]: {
    public: PUBLIC_GUILD_MESSAGES_KOOK,
    direct: MESSAGES
  },
  /**
   * 音频消息，
   */
  [8]: {
    public: PUBLIC_GUILD_MESSAGES_KOOK,
    direct: MESSAGES
  },
  /**
   * mk消息
   */
  [9]: {
    public: PUBLIC_GUILD_MESSAGES_KOOK,
    direct: MESSAGES
  },
  /**
   * card消息，
   */
  [10]: {
    public: PUBLIC_GUILD_MESSAGES_KOOK,
    direct: MESSAGES
  },
  /**
   * 系统消息
   * @param event
   */
  [255]: {
    public: async (event: SystemData) => {
      if (
        event.extra.type == 'added_reaction' ||
        event.extra.type == 'deleted_reaction'
      ) {
        //StatementData
        return await REACTIONS(event)
      } else if (event.extra.type == 'joined_channel') {
        //
        loger.info('joined_channel')
        return
      } else if (event.extra.type == 'exited_channel') {
        //
        loger.info('111exited_channel')
        return
      } else if (event.extra.type == 'updated_channel') {
        // ChannelData
        loger.info('updated_channel')
        return
        /**
         * ***********
         * 频道进出
         * *******
         */
      } else if (event.extra.type == 'joined_guild') {
        loger.info('joined_guild')
        await GUILD_MEMBER_ADD(event)
        return
      } else if (event.extra.type == 'exited_guild') {
        loger.info('exited_guild')
        await GUILD_MEMBER_REMOVE(event)
        return
        /**
         * **********
         * 消息变动
         * ********
         */
      } else if (event.extra.type == 'updated_message') {
        // 消息更新
        // EditingData
        loger.info('updated_message')
        return
      } else if (event.extra.type == 'pinned_message') {
        // 顶置消息
        // overheadData
        loger.info('pinned_message')
        return
      }
    },
    direct: async (event: SystemData) => {
      if (event.extra.type == 'guild_member_online') {
        //OnLineData
        loger.info('exited_guild')
        return
      } else if (event.extra.type == 'message_btn_click') {
        //按钮事件
        loger.info('message_btn_click')
        await INTERACTION(event)
        return
      }
    }
  }
}

/**
 * 消息接收入口
 * @param req
 * @param res
 */
export async function conversation(event: EventData | SystemData) {
  if (process.env?.ALEMONJS_EVENT == 'dev') loger.info('event', event)
  if (!Object.prototype.hasOwnProperty.call(ConversationMap, event.type)) return
  if (event.channel_type == 'GROUP') {
    ConversationMap[event.type]['public'](event)
  } else {
    ConversationMap[event.type]['direct'](event)
  }
  return
}
