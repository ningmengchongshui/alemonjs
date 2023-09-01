process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { createAlemon } from 'alemon-bot'
import { cmdInit } from 'alemon'

/**
 * 插件加载控制
 */

let T = false

const arr = []

for await (const item of process.argv) {
  /**
   * 不能启动相同的机器人
   */

  if (arr.indexOf(item) != -1) {
    // 启动过了
    continue
  }

  arr.push(item)

  /**
   * 存在且成功启动至少一个机器人
   */
  if (createAlemon[item] && (await createAlemon[item]())) {
    T = true
  }
}

if (T) {
  /**
   * 加载插件
   */
  await cmdInit()
}

/**
 * 监听退出,防止ts-node退出报错
 */
process.on('SIGINT', signals => {
  console.log(signals)
  if (process.pid) {
    process.exit()
  }
  return
})
