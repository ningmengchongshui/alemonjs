import { type EventEnum, type TypingEnum } from '../../../../core/index.js'
import { APPS } from '../../../../core/index.js'
import { ABotConfig } from '../../../../config/index.js'
import { BotMessage } from '../bot.js'
import { ClientDISOCRD } from '../../sdk/index.js'

/**
 * 表情增加
 * @param event
 */
export async function MESSAGE_REACTION_ADD(event: {
  user_id: string
  type: number
  message_id: string
  message_author_id: string
  member: {
    user: {
      username: string
      public_flags: number
      id: string
      global_name: string
      display_name: string
      discriminator: string
      bot: boolean
      avatar_decoration_data: null
      avatar: string
    }
    roles: string[]
    premium_since: null
    pending: boolean
    nick: null
    mute: boolean
    joined_at: string
    flags: number
    deaf: boolean
    communication_disabled_until: null
    avatar: null
  }
  emoji: { name: string; id: string }
  channel_id: string
  burst: boolean
  guild_id: string
}) {
  const masterID = ABotConfig.get('discord').masterID

  const e = {
    platform: 'qq',
    event: 'REACTIONS' as (typeof EventEnum)[number],
    typing: 'CREATE' as (typeof TypingEnum)[number],
    boundaries: 'publick' as 'publick' | 'private',
    attribute: 'group' as 'group' | 'single',
    bot: BotMessage.get(),
    isMaster: Array.isArray(masterID)
      ? masterID.includes(event.member.user.id)
      : event.member.user.id == masterID,
    attachments: [],
    specials: [],
    guild_id: event.guild_id,
    guild_name: '',
    guild_avatar: '',
    channel_name: '',
    channel_id: '',
    //
    at: false,
    at_user: undefined,
    at_users: [],
    msg_id: '',
    msg_txt: '',
    msg: '',
    quote: '',
    open_id: '',
    user_id: event.member.user.id,
    user_name: event.member.user.username,
    user_avatar: ClientDISOCRD.userAvatar(
      event.member.user.id,
      event.member.user.avatar
    ),
    send_at: new Date().getTime()
  }

  APPS.response(e)
  APPS.responseEventType(e)
  return
}
