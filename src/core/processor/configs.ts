import { BaseConfig } from '../config.js'

/**
 * 机器人信息缓存
 */
export class BaseBotMessage<D> {
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
    if (Object.prototype.hasOwnProperty.call(this.#data, key)) {
      this.#data[key] = val
    }
    return this
  }
  /**
   * 读取配置
   * @param key
   * @returns
   */
  get(): D {
    return this.#data
  }
}

export interface ApplicationProcessingOpsion {
  /**
   * 根目录
   */
  dir: string
  /**
   * 主文件
   */
  main: string
  /**
   * 主文件类型
   */
  type: 'ts' | 'js' | 'stript'
  /**
   * 匹配正则
   */
  openRegex: RegExp
  /**
   * 不匹配正则
   */
  closeRegex: RegExp | undefined
  /**
   * 指令json路由
   */
  route: string
  /**
   * 是否生成json
   */
  regex: boolean
  /**
   * 事件屏蔽器
   */
  event: string[]
}

/**
 * 应用配置
 */
export const AppLoadConfig = new BaseConfig<ApplicationProcessingOpsion>({
  dir: '/plugins',
  main: '/main',
  type: 'stript',
  openRegex: /./,
  closeRegex: undefined,
  event: [],
  route: '/public/defset',
  regex: true
})
