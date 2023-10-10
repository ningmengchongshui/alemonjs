import { createBot, createApp } from 'alemonjs'
import config from './config.js'

// 创建机器人
const compilationTools = await createBot({
  mount: true
})

// 加载模块
const word = await compilationTools(config)

// 创建应用
const app = createApp('bot')
// 设置执行生成地址
app.setHelp('public/defset')
// 设置模块
app.component(word)
// 挂载
app.mount('#app')
