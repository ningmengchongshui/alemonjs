import { IOpenAPI } from 'qq-guild-bot'
import {
  typeMessage,
  AMessage,
  CardType,
  getUrlbuffer
} from '../../../core/index.js'
import { getBotMsgByQQ } from '../bot.js'

// 非依赖引用
import { ClientQQ as Client } from '../../sdk/index.js'

import {
  AlemonJSEventError,
  AlemonJSEventLog,
  everyoneError
} from '../../../log/index.js'

declare global {
  //接口对象
  var ClientQQ: IOpenAPI
}

/**
GUILD_MEMBERS (1 << 1)
  - GUILD_MEMBER_ADD       // 当成员加入时
  - GUILD_MEMBER_UPDATE    // 当成员资料变更时
  - GUILD_MEMBER_REMOVE    // 当成员被移除时
 */
export const GUILD_MEMBERS = async (event: any) => {
  const Eevent = 'GUILD_MEMBERS'
  let eventType = 'CREATE'
  if (new RegExp(/ADD$/).test(event.eventType)) {
    eventType = 'CREATE'
  } else if (new RegExp(/UPDATE$/).test(event.eventType)) {
    eventType = 'UPDATE'
  } else {
    eventType = 'DELETE'
  }

  /**
   * 得到频道列表
   */
  const ChannelsData: boolean | any[] = await ClientQQ.channelApi
    .channels(event.msg.guild_id)
    .then(res => {
      const { data } = res
      return data
    })
    .catch(everyoneError)

  if (typeof ChannelsData == 'boolean') {
    console.info(`[${Eevent}] [${eventType}] ${false}`)
    return false
  }

  if (ChannelsData.length == 0) {
    console.info(`[${Eevent}] [${eventType}] ${false}`)
    return false
  }

  const ChannelData = ChannelsData.find(item => item.type === 0)

  const e = {
    platform: 'qq',
    bot: getBotMsgByQQ(),
    event: Eevent,
    eventType: eventType,
    isPrivate: false,
    isRecall: false,
    isGroup: true,
    boundaries: 'publick',
    attribute: 'group',
    /**
     * 发现消息
     * @param msg
     * @param img
     * @returns
     */
    reply: async (
      msg: Buffer | string | number | (Buffer | number | string)[],
      select?: {
        quote?: string
        withdraw?: number
      }
    ): Promise<any> => {
      // is buffer
      if (Buffer.isBuffer(msg)) {
        try {
          return await Client.postImage({
            id: ChannelData.id,
            msg_id: event.msg.id, //消息id, 必须
            image: msg //buffer
          }).catch(everyoneError)
        } catch (err) {
          console.error(err)
          return err
        }
      }
      // arr && find buffer
      if (Array.isArray(msg) && msg.find(item => Buffer.isBuffer(item))) {
        const isBuffer = msg.findIndex(item => Buffer.isBuffer(item))
        const cont = msg
          .map(item => {
            if (typeof item === 'number') return String(item)
            return item
          })
          .filter(element => typeof element === 'string')
          .join('')
        try {
          return await Client.postImage({
            id: ChannelData.id,
            msg_id: event.msg.id, //消息id, 必须
            image: msg[isBuffer] as Buffer, //buffer
            content: cont
          }).catch(everyoneError)
        } catch (err) {
          console.error(err)
          return err
        }
      }
      const content = Array.isArray(msg)
        ? msg.join('')
        : typeof msg === 'string'
        ? msg
        : typeof msg === 'number'
        ? `${msg}`
        : ''
      if (content == '') return false
      /**
       * http
       */

      const match = content.match(/<http>(.*?)<\/http>/)
      if (match) {
        const getUrl = match[1]
        const msg = await getUrlbuffer(getUrl)
        if (msg) {
          return await Client.postImage({
            id: event.msg.channel_id,
            msg_id: event.msg.id, //消息id, 必须
            image: msg //buffer
          }).catch(everyoneError)
        }
      }

      /**
       * 发送文字
       */
      return await ClientQQ.messageApi
        .postMessage(ChannelData.id, {
          content
        })
        .catch(everyoneError)
    },
    replyCard: async (arr: CardType[]) => {
      for (const item of arr) {
        try {
          if (item.type == 'qq_ark' || item.type == 'qq_embed') {
            await ClientQQ.messageApi
              .postMessage(event.msg.channel_id, {
                msg_id: event.msg.id,
                ...item.card
              })
              .catch(everyoneError)
          } else {
            return false
          }
        } catch (err) {
          return err
        }
      }
      return true
    }
  } as AMessage

  return await typeMessage(e)
    .then(() => AlemonJSEventLog(e.event, e.eventType))
    .catch(err => AlemonJSEventError(err, e.event, e.eventType))
}
