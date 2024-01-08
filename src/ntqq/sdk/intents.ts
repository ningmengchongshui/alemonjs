/**
 * 订阅枚举
 */
export const AvailableIntentsEventsEnum = [
  'GROUP_AT_MESSAGE_CREATE', // 群艾特消息
  'C2C_MESSAGE_CREATE', // 单聊消息
  'FRIEND_ADD', // 用户添加机器人
  'FRIEND_DEL', // 用户删除机器人
  'C2C_MSG_REJECT', // 拒绝机器人主动消息 | 允许机器人主动消息
  'GROUP_ADD_ROBOT', // 机器人加入群聊
  'GROUP_DEL_ROBOT', // 机器人退出群聊
  'GROUP_MSG_REJECT', // 群聊拒绝机器人主动消息
  'GROUP_MSG_RECEIVE', // 群聊接受机器人主动消息
  'INTERACTION_CREATE' // 点击回调按钮
] as const

/**
 * 订阅枚举
 */
export type IntentsEnum = (typeof AvailableIntentsEventsEnum)[number]

/**
 * 订阅事件集合
 */
const intentsMap = {
  GUILDS: 1 << 0,
  GUILD_CREATE: 1 << 0,
  GUILD_UPDATE: 1 << 0,
  GUILD_DELETE: 1 << 0,
  CHANNEL_CREATE: 1 << 0,
  CHANNEL_UPDATE: 1 << 0,
  CHANNEL_DELETE: 1 << 0,
  GUILD_MEMBERS: 1 << 1,
  GUILD_MEMBER_ADD: 1 << 1,
  GUILD_MEMBER_UPDATE: 1 << 1,
  GUILD_MEMBER_REMOVE: 1 << 1,
  GUILD_MESSAGES: 1 << 9,
  MESSAGE_CREATE: 1 << 9,
  MESSAGE_DELETE: 1 << 9,
  GUILD_MESSAGE_REACTIONS: 1 << 10,
  MESSAGE_REACTION_ADD: 1 << 10,
  MESSAGE_REACTION_REMOVE: 1 << 10,
  DIRECT_MESSAGE: 1 << 12,
  DIRECT_MESSAGE_CREATE: 1 << 12,
  DIRECT_MESSAGE_DELETE: 1 << 12,
  OPEN_FORUMS_EVENT: 1 << 18,
  OPEN_FORUM_THREAD_CREATE: 1 << 18,
  OPEN_FORUM_THREAD_UPDATE: 1 << 18,
  OPEN_FORUM_THREAD_DELETE: 1 << 18,
  OPEN_FORUM_POST_CREATE: 1 << 18,
  OPEN_FORUM_POST_DELETE: 1 << 18,
  OPEN_FORUM_REPLY_CREATE: 1 << 18,
  OPEN_FORUM_REPLY_DELETE: 1 << 18,
  AUDIO_OR_LIVE_CHANNEL_MEMBER: 1 << 19,
  AUDIO_OR_LIVE_CHANNEL_MEMBER_ENTER: 1 << 19,
  AUDIO_OR_LIVE_CHANNEL_MEMBER_EXIT: 1 << 19,
  INTERACTION: 1 << 26,
  INTERACTION_CREATE: 1 << 26,
  MESSAGE_AUDIT: 1 << 27,
  MESSAGE_AUDIT_PASS: 1 << 27,
  MESSAGE_AUDIT_REJECT: 1 << 27,
  FORUMS_EVENT: 1 << 28,
  FORUM_THREAD_CREATE: 1 << 28,
  FORUM_THREAD_UPDATE: 1 << 28,
  FORUM_THREAD_DELETE: 1 << 28,
  FORUM_POST_CREATE: 1 << 28,
  FORUM_POST_DELETE: 1 << 28,
  FORUM_REPLY_CREATE: 1 << 28,
  FORUM_REPLY_DELETE: 1 << 28,
  FORUM_PUBLISH_AUDIT_RESULT: 1 << 28,
  AUDIO_ACTION: 1 << 29,
  AUDIO_START: 1 << 29,
  AUDIO_FINISH: 1 << 29,
  AUDIO_ON_MIC: 1 << 29,
  AUDIO_OFF_MIC: 1 << 29,
  PUBLIC_GUILD_MESSAGES: 1 << 30,
  AT_MESSAGE_CREATE: 1 << 30,
  PUBLIC_MESSAGE_DELETE: 1 << 30,
  GROUP_AT_MESSAGE_CREATE: 1 << 25,
  C2C_MESSAGE_CREATE: 1 << 25,
  FRIEND_ADD: 1 << 25,
  GROUP_ADD_ROBOT: 1 << 25
}

export function getIntentsMask(intents: IntentsEnum[]) {
  let intentsMask = 0
  for (const item of intents) {
    const mask = intentsMap[item]
    if (mask) {
      intentsMask |= mask
    }
  }
  return intentsMask
}
