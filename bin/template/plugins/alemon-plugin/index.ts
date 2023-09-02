import { dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import { createApp, compilationTools } from 'alemon'
/**
 * 项目名称
 */
const AppName = basename(dirname(fileURLToPath(import.meta.url)))
/**
 * 加载模块
 */
const hello = await compilationTools({
  input: `plugins/${AppName}/apps/**/*.ts`,
  file: `plugins/${AppName}/apps.js`,
  external: ['alemon', 'path', 'fs', 'url']
}).finally(() => {
  console.log('《测试插件》启动')
})
/**
 * 创建应用
 */
const app = createApp(AppName)
/**
 * 设置
 */
app.component(hello)
/**
 * 挂载
 */
app.mount()
