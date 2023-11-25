import nodemon, { Settings } from 'nodemon'
import { buildModulsApps } from './index.js'
import { Anodemon } from './nodemon.js'
export async function defineAfloat(options: {
  control?: boolean
  build?: {
    input: string
    output: string
  }
  nodemon?: Settings
}) {
  for (const item in options.nodemon) {
    Anodemon[item] = options.nodemon[item]
  }
  if (options?.build?.input) {
    if (Array.isArray(Anodemon.watch)) {
      Anodemon.watch.push(options?.build?.input)
    }
  }
  if (Anodemon.script) {
    if (Array.isArray(Anodemon.watch)) {
      Anodemon.watch.push(Anodemon.script)
    }
  }
  if (options?.build?.output) {
    if (Array.isArray(Anodemon.ignore)) {
      Anodemon.ignore.push(options.build.output)
    }
  }
  if (options.control !== false) {
    const build = async () => {
      if (options?.build?.input && options.build?.output) {
        await buildModulsApps(options?.build)
      }
    }
    await build()
    // 配置 nodemon
    nodemon(Anodemon)
    // 监听启动事件
    nodemon.on('start', () => {
      console.log('[Afloat] start')
    })
    // 监听文件更改事件
    nodemon.on('restart', async message => {
      console.log('[Afloat] restart')
      console.log(message)
      await build()
    })
    // 监听退出事件
    nodemon.on('quit', () => {
      console.log('[Afloat] quit')
      process.exit()
    })
  }
  return Anodemon
}
