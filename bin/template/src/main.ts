import { createBot } from 'alemon-bot'
import { createApp } from 'alemon'

// 创建机器人
const compilationTools = await createBot({
  mount: true,
})

// 加载模块
const word = await compilationTools({
  aInput: `src/apps/**/*.ts`,
  aOutput: `.apps/index.js`
})

// 创建应用
const app = createApp('bot')
// 设置模块
app.component(word)
// 挂载
app.mount('#app')
