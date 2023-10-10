import { createApp, compilationTools } from 'alemon'
import { config, AppName } from './app.config.js'
// 加载模块
const hello = await compilationTools(config).finally(() => {
  console.log('《测试插件》启动')
})
// 创建应用
const app = createApp(AppName)
// 设置
app.component(hello)
// 挂载
app.mount()
