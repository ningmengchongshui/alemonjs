import { getAppName, compilationTools, createApp } from 'alemon'
const AppName = getAppName(import.meta.url)
// 加载模块
const hello = await compilationTools({
  aInput: `plugins/${AppName}/apps/**/*.ts`,
  aOutput: `.apps/${AppName}/index.js`
}).finally(() => {
  console.log('《测试插件》启动')
})
// 创建应用
const app = createApp(AppName)
// 设置
app.component(hello)
// 挂载
app.mount()
