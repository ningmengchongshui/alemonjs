import { ABuffer } from '../../core/index.js'
import { ClientNTQQ } from '../sdk/index.js'
import { ClientKOA } from '../../koa/index.js'

/**
 * 回复控制器
 * @param msg
 * @param villa_id
 * @param room_id
 * @returns
 */
export async function directController(
  msg: Buffer | string | number | (Buffer | number | string)[],
  open_id: string,
  msg_id: string
) {
  // isBuffer
  if (Buffer.isBuffer(msg)) {
    try {
      const url = await ClientKOA.getFileUrl(msg)
      if (!url) return false
      const file_info = await ClientNTQQ.postRichMediaByGroup(open_id, {
        srv_send_msg: false,
        file_type: 1,
        url: url
      }).then(res => res.file_info)
      if (!file_info) return false
      return await ClientNTQQ.usersOpenMessages(open_id, {
        content: '',
        media: {
          file_info
        },
        msg_id,
        msg_type: 7,
        msg_seq: ClientNTQQ.getMsgSeq(msg_id)
      })
    } catch (err) {
      console.error(err)
      return err
    }
  }
  /**
   * isString arr and find buffer
   */
  if (Array.isArray(msg) && msg.find(item => Buffer.isBuffer(item))) {
    const isBuffer = msg.findIndex(item => Buffer.isBuffer(item))
    const cont = msg
      .map(item => {
        if (typeof item === 'number') return String(item)
        return item
      })
      .filter(element => typeof element === 'string')
      .join('')
    const url = await ClientKOA.getFileUrl(msg[isBuffer] as Buffer)
    if (!url) return false
    const file_info = await ClientNTQQ.postRichMediaByGroup(open_id, {
      srv_send_msg: false,
      file_type: 1,
      url: url
    }).then(res => res.file_info)
    if (!file_info) return false
    return await ClientNTQQ.usersOpenMessages(open_id, {
      content: cont,
      media: {
        file_info
      },
      msg_id,
      msg_type: 7,
      msg_seq: ClientNTQQ.getMsgSeq(msg_id)
    })
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
   * https
   */
  const match = content.match(/<http>(.*?)<\/http>/)
  if (match) {
    const getUrl = match[1]
    const msg = await ABuffer.getUrl(getUrl)
    if (Buffer.isBuffer(msg)) {
      const url = await ClientKOA.getFileUrl(msg)
      if (!url) return false
      const file_info = await ClientNTQQ.postRichMediaByGroup(open_id, {
        srv_send_msg: false,
        file_type: 1,
        url: url
      }).then(res => res.file_info)
      if (!file_info) return false
      return await ClientNTQQ.usersOpenMessages(open_id, {
        content: '',
        media: {
          file_info
        },
        msg_id,
        msg_type: 7,
        msg_seq: ClientNTQQ.getMsgSeq(msg_id)
      })
    }
  }

  return await ClientNTQQ.usersOpenMessages(open_id, {
    content,
    msg_id,
    msg_type: 0,
    msg_seq: ClientNTQQ.getMsgSeq(msg_id)
  })
}