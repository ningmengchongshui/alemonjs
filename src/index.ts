if (process.argv.slice(2).includes('discord') && !process.argv.slice(2).includes('not')) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}
import { setLanchConfig } from 'alemon'
import { getBotConfigByKey, setBotConfig } from './login.js'
import { getToml } from './config.js'
import { loadInit } from 'alemon'
import { ClientAPIByQQ } from './ntqq/sdk/index.js'
// 机器人配置
export { getBotConfigByKey, setBotConfigByKey } from './login.js'
// 设置独立鉴权路径
export const setAuthenticationByNtqq = ClientAPIByQQ.setAuthentication
/**
 * 启动机器人
 */
export const createAlemon = {
  qq: async (): Promise<boolean> => {
    const { createAlemonByQQ: qq } = await import('./qq/index.js')
    return qq().catch(err => {
      console.error(err)
      console.error('QQ机器人启动失败~')
      return false
    })
  },
  villa: async (): Promise<boolean> => {
    const { createAlemonByVilla: villa } = await import('./villa/index.js')
    return villa().catch(err => {
      console.error(err)
      console.error('Villa机器人启动失败~')
      return false
    })
  },
  kook: async (): Promise<boolean> => {
    const { createAlemonByKOOK: kook } = await import('./kook/index.js')
    return kook().catch(err => {
      console.error(err)
      console.error('KOOK机器人启动失败~')
      return false
    })
  },
  discord: async (): Promise<boolean> => {
    const { createAlemonByDiscord: dc } = await import('./discord/index.js')
    return dc().catch(err => {
      console.error(err)
      console.error('Discord机器人启动失败~')
      return false
    })
  },
  ntqq: async (): Promise<boolean> => {
    const { createAlemonByNtqq: ntqq } = await import('./ntqq/index.js')
    return ntqq().catch(err => {
      console.error(err)
      console.error('Ntqq机器人启动失败~')
      return false
    })
  }
}

/**
 * 创建机器人
 * @param args ['discord','qq','ntqq','kook','villa']
 * @param cfg '/alemon.toml'
 * @returns
 */
export async function createBot(args: string[] = process.argv.slice(2), cfg?: string) {
  /**
   * 加载配置
   */
  await setBotConfig(getToml(cfg))
  /**
   * 设置浏览器配置
   */
  await setLanchConfig(getBotConfigByKey('puppeteer'))
  /**
   * 控制
   */
  const arr: string[] = []
  /**
   * 开始启动
   */
  for await (const item of args) {
    if (arr.indexOf(item) != -1) continue
    if (!createAlemon[item]) continue
    arr.push(item)
    await createAlemon[item]()
  }
  return loadInit
}

// 监听退出
process.on('SIGINT', signals => {
  console.info(signals)
  if (process.pid) {
    process.exit()
  }
  return
})
