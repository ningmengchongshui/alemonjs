import { APPS } from '../../../../core/index.js'
import { type EventEnum, type TypingEnum } from '../../../../core/index.js'
import { type EventData } from '../../sdk/index.js'
import { segmentKOOK } from '../segment.js'
import { BotMessage } from '../bot.js'
import { ABotConfig } from '../../../../config/index.js'

/**
 * 私聊消息
 * @param event
 * @returns
 */
export const MESSAGES = async (event: EventData) => {
  if (event.extra?.author?.bot) return false

  const open_id = event.extra.code

  const masterID = ABotConfig.get('kook').masterID

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
    bot: BotMessage.get(),
    isMaster: Array.isArray(masterID)
      ? masterID.includes(event.extra.author.id)
      : event.extra.author.id == masterID,
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
    send_at: event.msg_timestamp
  }
  APPS.response(e)
  APPS.responseMessage(e)
  return
}
