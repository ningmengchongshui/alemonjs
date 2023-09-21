// 插件模式启动code--替换main.ts后仅加载plugins
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import { createBot } from 'alemon-bot'

// 自动加载ffmpeg
// import ffmpeg from 'alemon-ffmpeg'
// await ffmpeg()

// 创建机器人
await createBot(process.argv.slice(2))
  .then(alemon => alemon())
  .catch(err => {
    console.log('出错啦', err)
  })
