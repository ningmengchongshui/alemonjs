import { AMessage, UserType, InstructionMatching } from 'alemon'
import { KOOKApiClient, EventData } from 'kook-ws'
import { getBotConfigByKOOK } from '../../config.js'
import { segmentKOOK } from '../segment.js'
import { getBotMsgByKOOK } from '../bot.js'

/**
 *
 * @param interaction
 * @returns
 */
export const PUBLIC_GUILD_MESSAGES_KOOK = async (interaction: EventData) => {
  // console.log('interaction', interaction)

  // return
  /**
   * 忽视机器人
   */
  if (interaction.extra.author.bot) {
    return false
  }

  /**
   * 艾特消息处理
   */
  let at = false

  /**
   *
   */
  const at_users: UserType[] = []

  /**
   *
   */
  let msg = interaction.content

  /**
   * 艾特类型所得到的
   * 包括机器人在内
   */
  const mention_role_part = interaction.extra.kmarkdown?.mention_role_part ?? []

  /**
   *
   */
  for await (const item of mention_role_part) {
    at = true
    at_users.push({
      id: item.role_id,
      name: item.name,
      avatar: 'string',
      bot: true
    })
    msg = msg.replace(`(rol)${item.role_id}(rol)`, '').trim()
  }

  /**
   * 艾特用户所得到的
   */
  const mention_part = interaction.extra.kmarkdown?.mention_part ?? []
  for await (const item of mention_part) {
    at = true
    at_users.push({
      id: item.id,
      name: item.username,
      avatar: item.avatar,
      bot: false
    })
    msg = msg.replace(`(met)${item.id}(met)`, '').trim()
  }

  /**
   *
   */
  let isMaster = false

  /**
   * 得到登录配置
   */

  const cfg = getBotConfigByKOOK()

  /**
   * 得到主人id
   */
  const masterID = cfg.masterID

  /**
   * 检查身份
   */
  if (interaction.msg_id == masterID) {
    /**
     * 是主人
     */
    isMaster = true
  }

  /**
   *
   */
  let at_user

  /**
   * 存在at
   */
  if (at) {
    if (at_users[0] && at_users[0].bot != true) {
      at_user = at_users[0]
    }
  }

  /**
   * 构造e对象
   */
  const e = {
    platform: 'kook',
    /**
     * 机器人信息  tudo
     */
    bot: getBotMsgByKOOK(),
    /**
     *
     */
    event: 'MESSAGES',
    /**
     *
     */
    eventType: 'CREATE',
    /**
     * kook没私域
     */
    isPrivate: true,
    /**
     * 不是撤回
     */
    isRecall: false,
    /**
     * 不是主人
     */
    isMaster: isMaster,
    /**
     * 是群聊 PERSON | GROUP
     */
    isGroup: interaction.channel_type == 'GROUP' ? true : false,
    /**
     * 艾特
     */
    at,
    /**
     *
     */
    at_users,
    /**
     *
     */
    at_user,
    /**
     *
     */
    msg,
    /**
     *
     */
    msg_id: interaction.msg_id,
    /**
     *
     */
    msg_txt: interaction.content,
    /**
     *
     */
    msg_create_time: interaction.msg_timestamp,
    /**
     *
     */
    guild_id: interaction.target_id,
    /**
     *
     */
    channel_id: interaction.extra.guild_id,
    /**
     *
     */
    user_id: interaction.extra.author.id,
    /**
     *
     */
    user_name: interaction.extra.author.username,
    /**
     *
     */
    user_avatar: interaction.extra.author.avatar,
    /**
     *
     */
    segment: segmentKOOK,
    /**
     * 消息发送机制
     * @param content 消息内容
     * @param obj 额外消息 可选
     */
    reply: async (
      msg?: string | string[] | Buffer,
      img?: Buffer | string,
      name?: string
    ): Promise<boolean> => {
      /**
       * buffer
       */
      if (Buffer.isBuffer(msg)) {
        try {
          const url = await KOOKApiClient.postImage(msg, typeof img == 'string' ? img : 'img.png')
          if (url) {
            if (interaction.channel_type == 'GROUP') {
              await KOOKApiClient.createMessage({
                type: 2,
                target_id: interaction.target_id,
                content: url
              })
              return true
            }
            await KOOKApiClient.createDirectMessage({
              type: 2,
              target_id: interaction.target_id,
              chat_code: interaction.extra.code,
              content: url
            })
            return true
          }
          return false
        } catch (err) {
          console.error(err)
          return false
        }
      }
      const content = Array.isArray(msg) ? msg.join('') : typeof msg === 'string' ? msg : undefined
      /**
       * buffer
       */
      if (Buffer.isBuffer(img)) {
        try {
          const url = await KOOKApiClient.postImage(img, name ?? 'img.png')
          if (url) {
            if (interaction.channel_type == 'GROUP') {
              await KOOKApiClient.createMessage({
                type: 9,
                target_id: interaction.target_id,
                content: content
              })
              await KOOKApiClient.createMessage({
                type: 2,
                target_id: interaction.target_id,
                content: url
              })
              return true
            }
            await KOOKApiClient.createDirectMessage({
              type: 9,
              target_id: interaction.target_id,
              chat_code: interaction.extra.code,
              content: content
            })
            await KOOKApiClient.createDirectMessage({
              type: 2,
              target_id: interaction.target_id,
              chat_code: interaction.extra.code,
              content: url
            })
            return true
          }
          return false
        } catch (err) {
          console.error(err)
          return false
        }
      }
      if (interaction.channel_type == 'GROUP') {
        try {
          await KOOKApiClient.createMessage({
            type: 9,
            target_id: interaction.target_id,
            content
          })
          return true
        } catch {
          return false
        }
      }
      try {
        await KOOKApiClient.createDirectMessage({
          type: 9,
          target_id: interaction.target_id,
          chat_code: interaction.extra.code,
          content
        })
        return true
      } catch {
        return false
      }
    }
  } as AMessage

  /**
   * 消息处理
   */
  await InstructionMatching(e)
    .then(() => {
      console.info(`\n[${e.channel_id}] [${e.user_name}] [${true}] ${e.msg_txt}`)
      return true
    })
    .catch((err: any) => {
      console.error(err)
      console.info(`\n[${e.channel_id}] [${e.user_name}] [${false}] ${e.msg_txt}`)
      return false
    })
}
