process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { createAlemon } from 'alemon-bot'
// import ffmpeg from 'alemon-ffmpeg'
// await ffmpeg()

/**
 * 控制
 */
const arr: string[] = []
/**
 * 指令合集
 */
const args = process.argv.slice(2)
/**
 * 推送插件启动到最后
 */
args.push('alemon')
/**
 * 开始启动
 */
for await (const item of args) {
  if (arr.indexOf(item) != -1) continue
  if (!createAlemon[item]) continue
  arr.push(item)
  await createAlemon[item]()
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
