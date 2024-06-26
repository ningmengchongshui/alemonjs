import WebSocket from 'ws'
import { ClientNTQQ } from './api.js'
import { config } from './config.js'
import { Counter } from '../../../core/index.js'
import { getIntentsMask } from './intents.js'
import { Email } from '../../../email/email.js'
import { loger } from '../../../log.js'
import { NTQQOptions } from './wss.types.js'

/**
 * 连接
 */
export class Client {
  //
  Email = new Email()
  //
  #counter = new Counter(1) // 初始值为1

  // 标记是否已连接
  #isConnected = false

  // 存储最新的消息序号
  #heartbeat_interval = 30000

  // 鉴权
  #IntervalID = null

  // url
  #gatewayUrl = null

  /**
   * 设置配置
   * @param opstion
   */
  set(opstion: NTQQOptions) {
    config.set('appID', opstion.appID)
    config.set('token', opstion.token)
    config.set('intents', getIntentsMask(opstion.intents))
    config.set('shard', opstion.shard)
    config.set('isPrivate', opstion.isPrivate)
    config.set('sandbox', opstion.sandbox)
    config.set('secret', opstion.secret)
    return this
  }

  /**
   * 定时鉴权
   * @param cfg
   * @returns
   */
  async #setTimeoutBotConfig() {
    const callBack = async () => {
      const appID = config.get('appID')
      const secret = config.get('secret')
      // 发送请求
      const data: {
        access_token: string
        expires_in: number
        cache: boolean
      } = await ClientNTQQ.getAuthentication(appID, secret).then(
        res => res.data
      )
      config.set('token', data.access_token)
      loger.info('refresh', data.expires_in, 's')
      setTimeout(callBack, data.expires_in * 1000)
    }
    await callBack()
    return
  }

  /**
   * 鉴权数据
   * @returns
   */
  #aut() {
    const token = config.get('token')
    const intents = config.get('intents')
    const shard = config.get('shard')
    return {
      op: 2, // op = 2
      d: {
        token: `QQBot ${token}`,
        intents: intents,
        shard: shard,
        properties: {
          $os: process.platform,
          $browser: 'alemonjs',
          $device: 'alemonjs'
        }
      }
    }
  }

  #ws: WebSocket

  /**
   *
   * @param cfg
   * @param conversation
   */
  async connect(conversation: (...args: any[]) => any) {
    // 定时模式
    await this.#setTimeoutBotConfig()

    // 请求url
    if (!this.#gatewayUrl) {
      this.#gatewayUrl = await ClientNTQQ.gateway().then(res => res?.url)
    }
    if (!this.#gatewayUrl) return

    // 重新连接的逻辑
    const reconnect = async () => {
      if (this.#counter.get() >= 5) {
        loger.info(
          'The maximum number of reconnections has been reached, cancel reconnection'
        )
        return
      }
      setTimeout(() => {
        loger.info('[ws] reconnecting...')
        // 重新starrt
        start()
        // 记录
        this.#counter.getNextID()
      }, 5000)
    }

    const start = () => {
      if (this.#gatewayUrl) {
        const map = {
          0: async ({ t, d }) => {
            // 存在,则执行t对应的函数
            await conversation(t, d)
            // Ready Event，鉴权成功
            if (t === 'READY') {
              this.#IntervalID = setInterval(() => {
                if (this.#isConnected) {
                  this.#ws.send(
                    JSON.stringify({
                      op: 1, //  op = 1
                      d: null // 如果是第一次连接，传null
                    })
                  )
                }
              }, this.#heartbeat_interval)
            }
            // Resumed Event，恢复连接成功
            if (t === 'RESUMED') {
              loger.info('[ws] restore connection')
              // 重制次数
              this.#counter.reStart()
            }
            return
          },
          6: ({ d }) => {
            loger.info('[ws] connection attempt', d)
            return
          },
          7: async ({ d }) => {
            // 执行重新连接
            loger.info('[ws] reconnect', d)
            // 取消鉴权发送
            if (this.#IntervalID) clearInterval(this.#IntervalID)
            return
          },
          9: ({ d, t }) => {
            loger.info('[ws] parameter error', d)
            return
          },
          10: ({ d }) => {
            // 重制次数
            this.#isConnected = true
            // 记录新循环
            this.#heartbeat_interval = d.heartbeat_interval
            // 发送鉴权
            this.#ws.send(JSON.stringify(this.#aut()))
            return
          },
          11: () => {
            // OpCode 11 Heartbeat ACK 消息，心跳发送成功
            loger.info('[ws] heartbeat transmission')
            // 重制次数
            this.#counter.reStart()
            return
          },
          12: ({ d }) => {
            loger.info('[ws] platform data', d)
            return
          }
        }
        // 连接
        this.#ws = new WebSocket(this.#gatewayUrl)
        this.#ws.on('open', () => {
          loger.info('[ws] open')

          if (process.env?.NODE_ENV == 'production') {
            this.Email.send({
              subject: 'AlemonJS-BOT',
              text: 'NTQQ-WS-close'
            })
          }
        })
        // 监听消息
        this.#ws.on('message', async msg => {
          const message = JSON.parse(msg.toString('utf8'))
          if (process.env.NTQQ_WS == 'dev') loger.info('message', message)
          // 根据 opcode 进行处理
          if (map[message.op]) {
            map[message.op](message)
          }
        })
        // 关闭
        this.#ws.on('close', async err => {
          await reconnect()
          loger.info('[ws] close', err)
        })
      }
    }
    start()
  }
}
