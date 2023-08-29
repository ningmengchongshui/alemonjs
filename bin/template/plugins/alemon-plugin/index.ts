import { dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import { createApp, integration } from 'alemon'
// 项目地址
const __dirname = dirname(fileURLToPath(import.meta.url))
// 项目名称
const AppName = basename(__dirname)
// 加载模块
const hello = await integration(AppName).catch(err => {
  console.error(err)
  return {}
})
// 创建应用
const app = createApp(AppName)
// 设置
app.component(hello)
// 挂载
app.mount()
