import {
  APPS,
  type EventEnum,
  type TypingEnum
} from '../../../../core/index.js'
import { BotMessage } from '../bot.js'
import { segmentQQ } from '../segment.js'

/**
 * 子频道删除
 * @param event
 * @returns
 */
export const CHANNEL_DELETE = async (event: {
  application_id?: string // 创建时
  guild_id: string // 频道id
  id: string
  name: string // 频道name
  op_user_id: string
  owner_id: string
  parent_id?: string // 创建时
  permissions?: string // 创建时
  position?: number // 创建时
  private_type: number
  speak_permission: number
  sub_type: number
  type: number
}) => {
  const e = {
    platform: 'qq',
    event: 'CHANNEL' as (typeof EventEnum)[number],
    typing: 'DELETE' as (typeof TypingEnum)[number],
    boundaries: 'publick' as 'publick' | 'private',
    attribute: 'group' as 'group' | 'single',
    bot: BotMessage.get(),
    isMaster: false,
    attachments: [],
    specials: [],
    guild_id: event?.guild_id, // ?
    guild_name: '',
    guild_avatar: '',
    channel_name: '',
    channel_id: '',
    //
    at: false,
    at_user: undefined,
    at_users: [],
    msg: '',
    msg_id: '',
    msg_txt: '',
    quote: '',
    open_id: event.guild_id,
    //
    user_id: '',
    user_name: '',
    user_avatar: '',
    segment: segmentQQ,
    send_at: new Date().getTime()
  }

  APPS.response(e)
  APPS.responseEventType(e)
  return
}
