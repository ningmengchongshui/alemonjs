import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'
/**
 * 指令运行队则
 * @param ars 指令参数数组
 */
export function commandRun(ars: string[], file = 'alemon.config.ts') {
  const msg = ars.join(' ')
  const files = msg.match(/(\S+\.js|\S+\.ts)/g) ?? [file]
  const argsWithoutFiles = msg.replace(/(\S+\.js|\S+\.ts)/g, '')
  if (files && files[0]) {
    const app = files[0]
    if (!existsSync(join(process.cwd(), app))) {
      console.info('no file', app)
    } else {
      const isTypeScript = app.endsWith('.ts')
      const command = isTypeScript ? 'ts-node' : 'node'
      const cmd = `${command} ${app} ${argsWithoutFiles}`
      const childProcess = spawn(cmd, { shell: true })
      childProcess.stdout.on('data', data => {
        process.stdout.write(data.toString())
      })
      childProcess.stderr.on('data', data => {
        process.stderr.write(data.toString())
      })
    }
  }
}
