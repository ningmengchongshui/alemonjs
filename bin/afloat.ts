#!/usr/bin/env node

import { buildModulsApps } from '../lib/index.js'

import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

const argv = [...process.argv]
const arg = argv.splice(2)

if (arg.includes('build')) {
  // 看看有无参数
  const input =
    arg.indexOf('--input') != -1
      ? arg.indexOf('--input')
      : arg.indexOf('--i') != -1
      ? arg.indexOf('--i')
      : false
  const output =
    arg.indexOf('--output') != -1
      ? arg.indexOf('--output')
      : arg.indexOf('--o') != -1
      ? arg.indexOf('--o')
      : false
  await buildModulsApps({
    input: input != false ? arg[input + 1] : 'apps/**/*.{ts,js}',
    output: output != false ? arg[output + 1] : 'alemon.app.js'
  })
} else if (arg.includes('dev')) {
  const msg = arg.join(' ')
  const files = msg.match(/(\S+\.js|\S+\.ts)/g) ?? ['afloat.config.ts']
  const argsWithoutFiles = msg.replace(/(\S+\.js|\S+\.ts)/g, '')
  if (files && files[0]) {
    const app = files[0]
    if (!existsSync(join(process.cwd(), app))) {
      console.info('no file', app)
    } else {
      const isTypeScript = app.endsWith('.ts')
      const command = isTypeScript ? 'ts-node' : 'node'
      const cmd = `${command} ${app} ${argsWithoutFiles}`
      console.info(cmd)
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
