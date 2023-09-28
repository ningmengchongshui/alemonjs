if (process.argv.slice(2).includes('discord') && !process.argv.slice(2).includes('not')) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}
import { createBot } from 'alemon-bot'
import { createApp, compilationTools } from 'alemon'

// 自动加载ffmpeg
// import ffmpeg from 'alemon-ffmpeg'
// await ffmpeg()

// 创建机器人
await createBot(process.argv.slice(2))
  .then(alemon => alemon(false))
  .catch((err: any) => {
    console.log('AlemonBot:', err)
  })

// 加载模块
const alemon = await compilationTools({
  // 对example下的所有ts文件进行编译
  input: `example/**/*.ts`,
  // 模块文件
  file: `example.js`,
  // 忽视提示
  external: ['alemon']
})

// 创建应用
const app = createApp('alemon')
// 设置模块
app.component(alemon)
// 挂载
app.mount('#app')
