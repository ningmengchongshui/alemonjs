import {
  RESPONSE,
  type EventEnum,
  type TypingEnum,
  type MessageBingdingOption
} from '../../../core/index.js'
import { type EventData } from '../../sdk/index.js'
import { segmentKOOK } from '../segment.js'
import { getBotMsgByKOOK } from '../bot.js'
import { BOTCONFIG } from '../../../config/index.js'
import { AlemonJSError, AlemonJSLog } from '../../../log/index.js'
import { Controllers, directController } from '../direct.js'

/**
 * @param event
 * @returns
 */
export const DIRECT_MESSAGE = async (event: EventData) => {
  if (event.extra?.author?.bot) return false

  if (process.env?.ALEMONJS_EVENT == 'dev') console.info('event', event)

  const open_id = event.extra.code

  const cfg = BOTCONFIG.get('kook')
  const masterID = cfg.masterID

  const avatar = event.extra.author.avatar

  const e = {
    platform: 'kook',
    event: 'MESSAGES' as (typeof EventEnum)[number],
    typing: 'CREATE' as (typeof TypingEnum)[number],
    boundaries: 'private' as 'publick' | 'private',
    attribute:
      event.channel_type == 'GROUP'
        ? 'group'
        : ('single' as 'group' | 'single'),
    bot: getBotMsgByKOOK(),
    isMaster: event.extra.author.id == masterID,
    guild_id: '', // 频道号
    guild_name: '',
    guild_avatar: '',
    channel_name: event.extra.channel_name,
    channel_id: event.target_id, // 子频道
    attachments: [],
    specials: [],
    //
    at: false,
    at_users: [],
    at_user: undefined,
    msg: event?.extra?.kmarkdown?.raw_content ?? event.content,
    msg_txt: event?.extra?.kmarkdown?.raw_content ?? event.content,
    msg_id: event.msg_id,
    quote: '',
    open_id: open_id,
    //
    user_id: event.extra.author.id,
    user_name: event.extra.author.username,
    user_avatar: avatar.substring(0, avatar.indexOf('?')),
    segment: segmentKOOK,
    send_at: event.msg_timestamp,
    /**
     * 消息发送机制
     * @param content 消息内容
     * @param obj 额外消息 可选
     */
    reply: async (
      msg: Buffer | string | number | (Buffer | number | string)[],
      select?: MessageBingdingOption
    ): Promise<any> => {
      const channel_id = select?.channel_id ?? event.target_id
      return await directController(msg, channel_id, select?.open_id ?? open_id)
    },
    Controllers
  }

  /**
   * 业务处理
   */
  return await RESPONSE.message(e)
    .then(() => AlemonJSLog(e.channel_id, e.user_name, e.msg_txt))
    .catch(err => AlemonJSError(err, e.channel_id, e.user_name, e.msg_txt))
}
