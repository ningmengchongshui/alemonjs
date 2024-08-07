import {
  type EventEnum,
  type TypingEnum,
  type UserType
} from '../../../../core/index.js'
import { APPS } from '../../../../core/index.js'
import { ABotConfig } from '../../../../config/index.js'
import { BotMessage } from '../bot.js'
import { ClientDISOCRD } from '../../sdk/index.js'

/**
 * 基础消息
 * @param event
 */
export async function MESSAGE_CREATE(event: {
  type: number
  tts: boolean
  timestamp: string
  referenced_message: null
  pinned: boolean
  nonce: string
  mentions: {
    username: string
    public_flags: number
    member: any
    id: string
    global_name: null
    discriminator: string
    bot: boolean
    avatar_decoration_data: null
    avatar: string
  }[]
  mention_roles: any[]
  mention_everyone: boolean
  member: {
    roles: any[]
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
  id: string
  flags: number
  embeds: any[]
  edited_timestamp: null
  content: string
  components: any[]
  channel_id: string
  author: {
    username: string
    public_flags: number
    premium_type: number
    id: string
    global_name: string
    discriminator: string
    avatar_decoration_data: null
    avatar: string
    bot?: boolean
  }
  attachments: any[]
  guild_id: string
}) {
  if (event.author?.bot) return

  const masterID = ABotConfig.get('discord').masterID

  /**
   * 艾特消息处理
   */
  const at_users: UserType[] = []

  /**
   * 切割
   */
  for (const item of event.mentions) {
    at_users.push({
      id: item.id,
      name: item.username,
      avatar: ClientDISOCRD.userAvatar(item.id, item.avatar),
      bot: item.bot
    })
  }

  /**
   * 清除 @ 相关
   */
  let msg = event.content
  for await (const item of at_users) {
    msg = msg.replace(`<@${item.id}>`, '').trim()
  }

  /**
   * 艾特处理
   */
  let at = false
  let at_user: UserType | undefined = undefined
  if (at_users.some(item => item.bot != true)) {
    at = true
  }
  if (at) {
    at_user = at_users.find(item => item.bot != true)
  }

  const e = {
    platform: 'qq',
    event: 'MESSAGES' as (typeof EventEnum)[number],
    typing: 'CREATE' as (typeof TypingEnum)[number],
    boundaries: 'publick' as 'publick' | 'private',
    attribute: 'group' as 'group' | 'single',
    bot: BotMessage.get(),
    isMaster: Array.isArray(masterID)
      ? masterID.includes(event.author.id)
      : event.author?.id == masterID,
    attachments: event?.attachments ?? [],
    specials: [],
    guild_id: event.guild_id,
    guild_name: '',
    guild_avatar: '',
    channel_name: '',
    channel_id: event.channel_id,
    //
    at: at,
    at_user: at_user,
    at_users: at_users,
    msg_id: event.id,
    msg_txt: event.content,
    msg: msg,
    quote: '',
    open_id: '',
    user_id: event.author.id,
    user_name: event.author.username,
    user_avatar: ClientDISOCRD.userAvatar(event.author.id, event.author.avatar),
    send_at: new Date(event.timestamp).getTime()
  }
  APPS.response(e)
  APPS.responseMessage(e)
  return
}
