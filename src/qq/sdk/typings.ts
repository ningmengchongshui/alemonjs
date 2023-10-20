/**
 * 登录配置
 */
export interface BotConfig {
  appID: string
  token: string
  secret: string
  intents: IntentsEnum[]
  sandbox: boolean
}

export type IntentsEnum = (typeof AvailableIntentsEventsEnum)[number]

/**
 * 订阅枚举
 */
export const AvailableIntentsEventsEnum = [
  'GUILDS',
  'GUILD_MEMBERS',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS',
  'DIRECT_MESSAGE',
  'FORUMS_EVENT',
  'AUDIO_ACTION',
  'PUBLIC_GUILD_MESSAGES',
  'MESSAGE_AUDIT',
  'INTERACTION'
] as const
