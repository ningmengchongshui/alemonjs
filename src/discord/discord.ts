import { IntentsEnum } from './sdk/index.js'
/**
 * ****
 * discord
 * ***
 */
export interface DISOCRDOptions {
  /**
   * 钥匙
   */
  token: string
  /**
   * 订阅
   */
  intent?: IntentsEnum[]
  /**
   * 分片
   */
  shard?: number[]
  /**
   * 主人编号
   */
  masterID?: string
  /**
   * 主人密码
   */
  password?: string
}
/**
 *
 */
export const defineDISCORD: DISOCRDOptions = {
  token: '',
  intent: [
    IntentsEnum.MESSAGE_CONTENT, // 内容是基础
    //
    IntentsEnum.DIRECT_MESSAGES,
    IntentsEnum.DIRECT_MESSAGE_TYPING,
    IntentsEnum.DIRECT_MESSAGE_REACTIONS,
    //
    IntentsEnum.GUILDS,
    IntentsEnum.GUILD_MESSAGE_TYPING,
    IntentsEnum.GUILD_MESSAGE_REACTIONS,
    IntentsEnum.GUILD_MESSAGES,
    IntentsEnum.GUILD_MEMBERS,
    //
    IntentsEnum.GUILD_MODERATION,
    IntentsEnum.GUILD_EMOJIS_AND_STICKERS,
    IntentsEnum.GUILD_INTEGRATIONS,
    IntentsEnum.GUILD_WEBHOOKS,
    IntentsEnum.GUILD_INVITES,
    IntentsEnum.GUILD_VOICE_STATES,
    IntentsEnum.GUILD_PRESENCES
  ],
  shard: [0, 1],
  masterID: '',
  password: ''
}
