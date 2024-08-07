import { AEvent } from '../typings.js'
import { join } from 'path'
import { existsSync, readdirSync } from 'fs'
import { AppLoadConfig } from './configs.js'
import { AppMap } from './data.js'
import { AObserver } from './subscribe.js'
import { Alemon } from './alemon.js'
import { readScript } from './read.js'
import { LRUCache } from 'lru-cache'
import { loger } from '../../log.js'
const cache = new LRUCache<string, number>({ max: 100 })

/**
 * 应用
 */
export class App {
  /**
   * 扫码
   * @returns
   */
  async load() {
    /**
     * 开始扫描
     */
    const dir = join(process.cwd(), AppLoadConfig.get('dir'))
    if (!existsSync(dir)) return
    const flies = readdirSync(dir)
    if (flies.length == 0) return
    // 读取配置
    const open = AppLoadConfig.get('openRegex')
    const close: undefined | RegExp = AppLoadConfig.get('closeRegex')
    // 排除
    const apps = flies
      .filter(item => open.test(item))
      .filter(item => {
        if (!close) return true
        return !close.test(item)
      })
    //动态扫描
    const main = AppLoadConfig.get('main')
    const typeVal = AppLoadConfig.get('type')
    const types = []
    if (typeVal != 'stript') {
      types.push(typeVal)
    } else {
      types.push('js')
      types.push('ts')
    }
    const promise = []
    for (const typing of types) {
      for (const appname of apps) {
        if (existsSync(`${dir}/${appname}${main}.${typing}`)) {
          promise.push(readScript(`${dir}/${appname}${main}.${typing}`))
        }
      }
    }
    return Promise.all(promise)
  }

  // 大正则数组
  #mergedRegexArr: RegExp[] = []

  // 数组化正则
  #regular: RegExp

  /**
   * 初始化
   */
  init() {
    // 清空
    this.#mergedRegexArr = []
    // 得到所有key
    for (const item in AppMap.keys()) {
      const reg = AppMap.get(item).getReg()
      if (reg) this.#mergedRegexArr.push(reg)
    }
    // 构造大正则
    this.#regular = new RegExp(
      this.#mergedRegexArr.map(regex => regex.source).join('|')
    )
  }

  /**
   * 判断指定的消息是否可以触发机器人
   * @param msg
   * @returns
   */
  trigger(msg: string) {
    // 没有任何指令
    if (!this.#regular) return false
    // 存在索引
    if (this.#regular.test(msg)) return true
    return false
  }

  /**
   * 响应回调
   * @param e
   * @returns
   */
  response(e: AEvent) {
    if (process.env.ALEMONJS_AEVENT == 'dev') loger.info('AEvent', e)
    loger.info(`[${e.event}] [${e.typing}] ${e.msg}`)
    Promise.all(
      Array.from(AppMap.values()).map((app: typeof Alemon.prototype) =>
        app.response(e)
      )
    )
  }

  /**
   * 响应消息
   * @param e
   * @returns
   */
  responseMessage(e: AEvent) {
    const now = Date.now()
    if (cache.has(e.user_id)) {
      const time = cache.get(e.user_id)
      // 1s 内 并发限制
      if (now < time + AppLoadConfig.get('intervalTime')) {
        return
      }
    }
    cache.set(e.user_id, now)
    if (process.env.ALEMONJS_AEVENT == 'dev') loger.info('AEvent', e)
    loger.info(`[${e.event}] [${e.typing}] ${e.msg}`)
    let con = false
    const channel_sb = AObserver.find(e.channel_id)
    if (channel_sb && channel_sb.node) {
      con = true
      AppMap.get(channel_sb.node.name).responseNode(e, channel_sb.node)
    }
    const user_sb = AObserver.find(e.user_id)
    if (user_sb && user_sb.node && !con) {
      con = true
      AppMap.get(user_sb.node.name).responseNode(e, user_sb.node)
      return
    }

    if (con) return

    // 正则系统
    if (!this.trigger(e.msg)) return
    Promise.all(
      Array.from(AppMap.values()).map((app: typeof Alemon.prototype) =>
        app.responseMessage(e)
      )
    )
  }

  /**
   * 响应消息类型
   * @param e
   */
  responseEventType(e: AEvent) {
    if (process.env.ALEMONJS_AEVENT == 'dev') loger.info('AEvent', e)
    loger.info(`[${e.event}] [${e.typing}]`)
    Promise.all(
      Array.from(AppMap.values()).map((app: typeof Alemon.prototype) =>
        app.responseEventType(e)
      )
    )
  }

  /**
   * 删除指定应用
   * @param key
   */
  del(key: string) {
    if (!AppMap.has(key)) return
    // 删除
    AppMap.delete(key)
    // 重新init
    this.init()
  }

  /**
   * 设置指定应用
   * @param key
   * @param val
   */
  set(key: string, val: typeof Alemon.prototype) {
    // 如果存在先删除
    if (AppMap.has(key)) AppMap.delete(key)
    AppMap.set(key, val)
    // 重新init
    this.init()
  }
}

if (!global?.alemonjs) global.alemonjs = {}
if (!global.alemonjs.applications) global.alemonjs.applications = new App()

// 索引系统
export const APPS = global.alemonjs.applications
