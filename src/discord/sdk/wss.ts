import WebSocket from 'ws'
import { gateway } from './api.js'
import { config } from './config.js'
/**
 * 创建ws监听
 * @param conversation
 * @param shard
 * @returns
 */
export async function createClient(
  conversation: (...args: any[]) => any,
  shard = [0, 1]
) {
  const { url } = await gateway()
  if (!url) {
    console.error('[getway] token err')
    return
  }
  const ws = new WebSocket(`${url}?v=10&encoding=json`)
  let heartbeat_interval = 0
  let session_id = ''
  let resume_gateway_url = ''
  ws.on('open', async () => {
    console.log('[ws] open')
  })
  const call = async () => {
    ws.send(
      JSON.stringify({
        op: 1, //  op = 1
        d: null // 如果是第一次连接，传null
      })
    )
    setTimeout(call, heartbeat_interval)
  }
  const token = config.get('token')
  const intent = config.get('intent')
  const map = {
    0: ({ d, t }) => {
      conversation(t, d)
      if (t == 'READY') {
        session_id = d?.session_id
        if (d?.resume_gateway_url) {
          resume_gateway_url = d?.resume_gateway_url
        }
      }
    },
    7: () => {
      console.info('[ws] 重新请求')
      ws.send(
        JSON.stringify({
          op: 6,
          d: {
            token: token,
            session_id: session_id,
            seq: 1337
          }
        })
      )
    },
    9: message => {
      //  6 或 2 失败
      // 连接失败
      console.info('[ws] parameter error', message)
    },
    /**
     * 打招呼
     * @param param0
     */
    10: ({ d }) => {
      const { heartbeat_interval: ih } = d
      heartbeat_interval = ih
      //
      ws.send(
        JSON.stringify({
          op: 1,
          d: null
        })
      )
      setTimeout(call, heartbeat_interval)
      // 在初次握手期间启动新会话
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            shard: shard,
            token: `Bot ${token}`,
            intents: intent,
            properties: {
              os: process.platform,
              browser: 'alemonjs',
              device: 'alemonjs'
            }
          }
        })
      )
    },
    11: ({ d }) => {
      console.info('[ws] heartbeat transmission')
    }
  }

  ws.on('message', data => {
    const parsedData = JSON.parse(data.toString())
    const { op, d } = parsedData
    if (process.env?.DISCORD_WS == 'dev') {
      console.info('data', d)
    }
    if (Object.prototype.hasOwnProperty.call(map, op)) {
      map[op](parsedData)
    }
  })

  // 关闭
  ws.on('close', err => {
    console.error('[ws] 登录失败,TOKEN存在风险')
  })

  // 出错
  ws.on('error', error => {
    console.error('[ws] error:', error)
  })
}

/**
0	派遣	收到	已发送事件。
1	心跳	发送/接收	由客户端定期触发以保持连接处于活动状态。
2	确认	发送	在初次握手期间启动新会话。
3	状态更新	发送	更新客户的状态。
4	语音状态更新	发送	用于加入/离开或在语音通道之间移动。
6	恢复	发送	恢复先前断开的会话。
7	重新连接	收到	您应该尝试立即重新连接并恢复。
8	请求公会成员	发送	请求有关大型公会中的离线公会成员的信息。
9	无效会话	收到	会话已失效。您应该重新连接并相应地识别/恢复。
10	你好	收到	连接后立即发送，包含heartbeat_interval要使用的。
11	心跳确认	收到	发送以响应收到心跳以确认已收到。
 */
