import { type BotConfigType } from './types.js'
import { DefaultConfig } from '../default/index.js'
import { defineKOOK as kook } from '../kook/kook.js'
import { defineVILLA as villa } from '../villa/villa.js'
import { defineQQ as qq } from '../qq/qq.js'
import { defineNtqq as ntqq } from '../ntqq/ntqq.js'
import { defineDISCORD as discord } from '../discord/discord.js'
import { Screenshot } from '../core/index.js'

class BaseConfig<D> {
  #data: D = null
  constructor(val: D) {
    this.#data = val
  }
  /**
   * 设置配置
   * @param key
   * @param val
   */
  set<T extends keyof D>(key: T, val: D[T]) {
    if (key == 'puppeteer') {
      // pup 不用检查 直接覆盖
      for (const item in val) {
        this.#data[key][item] = val[item]
      }
    } else {
      for (const item in val) {
        // 当前仅当同属性名的时候才会覆盖默认配置
        if (Object.prototype.hasOwnProperty.call(this.#data[key], item)) {
          this.#data[key][item] = val[item]
        } else {
          // 不属于默认
          try {
            this.#data[key] = {} as any
            this.#data[key] = val[item] as any
            console.info('KEY secess')
          } catch {
            console.info('KEY err')
          }
        }
      }
    }
  }
  /**
   * 读取配置
   * @param key
   * @returns
   */
  get<T extends keyof D>(key: T): D[T] | undefined {
    return this.#data[key]
  }
}

/**
 * 机器人配置
 */
export const BOTCONFIG = new BaseConfig<BotConfigType>({
  ...DefaultConfig,
  kook,
  villa,
  qq,
  ntqq,
  puppeteer: Screenshot.launch,
  discord
})
