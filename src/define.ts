import nodemon from 'nodemon'
import { compilationTools } from './index.js'
import { commandRun } from './run.js'
import { Anodemon } from './nodemon.js'
export function defineAfloat(options: {
  build?: {
    input: string
    output: string
  }
  main?: string
  nodemon?: nodemon.Settings
}) {
  if (options?.build?.input) {
    const dir = options?.build?.input.split('/')
    Anodemon.watch.push(dir[0])
  }
  if (options?.build?.output) {
    Anodemon.ignore.push(options.build.output)
  }
  const call = async () => {
    if (options?.build?.input && options.build?.output) {
      await compilationTools({
        aInput: options?.build?.input ?? 'apps/**/*.ts',
        aOutput: options.build?.output ?? 'alemon.app.js'
      })
    }
    commandRun(process.argv.slice(2))
  }
  console.log('Anodemon', Anodemon)
  // 配置 nodemon
  nodemon(Anodemon)
  // 监听启动事件
  nodemon.on('start', () => {
    console.log('[Afloat] start')
    call()
  })
  // 监听文件更改事件
  nodemon.on('restart', message => {
    console.log('[Afloat] restart')
    console.log(message)
  })
  // 监听退出事件
  nodemon.on('quit', () => {
    console.log('[Afloat] quit')
    process.exit()
  })
}
