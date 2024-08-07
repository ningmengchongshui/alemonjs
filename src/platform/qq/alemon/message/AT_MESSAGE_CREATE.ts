import {
  APPS,
  type EventEnum,
  type TypingEnum
} from '../../../../core/index.js'
import { BotMessage } from '../bot.js'
import { ABotConfig } from '../../../../config/index.js'

/**
 * 公域
 * @param event
 * @returns
 */
export const AT_MESSAGE_CREATE = async (event: {
  attachments?: {
    // id
    id: string
    // url
    url: string
    // 类型
    content_type: string
    // 文件名
    filename: string
    // 大小
    size: number
    // 高度
    height: number
    // 宽度
    width: number
  }[]
  author: {
    avatar: string
    bot: boolean
    id: string
    username: string
  }
  channel_id: string
  content: string
  guild_id: string
  id: string
  member: {
    joined_at: string
    nick: string
    roles: string[]
  }
  mentions: {
    avatar: string
    bot: boolean
    id: string
    username: string
  }[]
  seq: number
  seq_in_channel: string
  timestamp: string
}) => {
  // 屏蔽其他机器人的消息
  if (event.author.bot) return

  const masterID = ABotConfig.get('qq').masterID

  const e = {
    platform: 'qq',
    event: 'MESSAGES' as (typeof EventEnum)[number],
    typing: 'CREATE' as (typeof TypingEnum)[number],
    boundaries: 'publick' as 'publick' | 'private',
    attribute: 'group' as 'group' | 'single',
    bot: BotMessage.get(),

    isMaster: Array.isArray(masterID)
      ? masterID.includes(event?.author?.id)
      : event?.author?.id == masterID,
    attachments: event?.attachments ?? [],
    specials: [],
    guild_id: event.guild_id,
    guild_name: '',
    guild_avatar: '',
    channel_name: '',
    channel_id: event.channel_id,
    //
    at: false,
    at_user: undefined,
    at_users: [],
    msg_id: event.id,
    msg_txt: event?.content ?? '',
    msg: event?.content ?? '',
    quote: '',
    open_id: event.guild_id,

    //
    user_id: event?.author?.id ?? '',
    user_name: event?.author?.username ?? '',
    user_avatar: event?.author?.avatar ?? '',
    send_at: new Date().getTime()
  }

  if (event.mentions) {
    /**
     * 去掉@ 转为纯消息
     */
    for await (const item of event.mentions) {
      if (item.bot != true) {
        // 用户艾特才会为真
        e.at = true
      }
      e.at_users.push({
        id: item.id,
        name: item.username,
        avatar: item.avatar,
        bot: item.bot
      })
    }
    /**
     * 循环删除文本中的at信息并去除前后空格
     */
    e.at_users.forEach(item => {
      e.msg = e.msg.replace(`<@!${item.id}>`, '').trim()
    })
  }

  /**
   * 存在at
   */
  if (e.at) {
    /**
     * 得到第一个艾特
     */
    e.at_user = e.at_users.find(item => item.bot != true)
  }

  if (e.bot.avatar == '') {
    /**
     * 配置一下机器人头像
     */
    const bot = e.at_users.find(item => item.bot == true && item.id == e.bot.id)
    if (bot) {
      e.bot.avatar = bot.avatar
      BotMessage.set('id', e.bot.id)
      BotMessage.set('name', e.bot.name)
      BotMessage.set('avatar', e.bot.avatar)
    }
  }
  APPS.response(e)
  APPS.responseMessage(e)
}
