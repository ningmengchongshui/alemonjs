import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'
/**
 * 指令运行队则
 * @param ars
 * @param file
 */
export function commandRun(ars?: string[], file = 'alemon.config.ts') {
  if (!ars) {
    ars = [...process.argv.splice(2)]
  }
  const msg = ars.join(' ')
  const files = msg.match(/(\S+\.js|\S+\.ts)/g) ?? [file]
  const argsWithoutFiles = msg.replace(/(\S+\.js|\S+\.ts)/g, '')
  if (files && files[0]) {
    const app = files[0]
    if (!existsSync(join(process.cwd(), app))) {
      console.info('no file', app)
    } else {
      const cmd = `ts-node ${app} ${argsWithoutFiles}`
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
