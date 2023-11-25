#!/usr/bin/env node

import { buildModulsApps } from '../lib/index.js'
import { spawn } from 'child_process'
import { mkdirSync, copyFileSync, existsSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'

const argv = [...process.argv]
const arg = argv.splice(2)
const cwd = process.cwd()

function createFile(tar: string, dist: string) {
  const Pkg = join(cwd, tar)
  if (!existsSync(Pkg)) return
  const DistPkg = join(cwd, dist)
  if (!existsSync(DistPkg)) {
    mkdirSync(dirname(DistPkg), { recursive: true })
    writeFileSync(DistPkg, '')
  }
  copyFileSync(Pkg, DistPkg)
}

async function build() {
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
  const put = output != false ? arg[output + 1] : 'alemon.app.js'
  await buildModulsApps({
    input: input != false ? arg[input + 1] : 'apps/**/*.{ts,js}',
    output: put
  })
  const dist =
    arg.indexOf('--d') != -1
      ? arg.indexOf('--d')
      : arg.indexOf('--dir') != -1
      ? arg.indexOf('--dir')
      : arg.indexOf('--directory') != -1
      ? arg.indexOf('--directory')
      : arg.indexOf('--dist') != -1
      ? arg.indexOf('--dist')
      : false
  const dir = dist != false ? arg[dist + 1] : 'dist'
  createFile(put, `${dir}/${put}`)
  createFile('main.js', `${dir}/main.js`)
  createFile('package.json', `${dir}/package.json`)
}

function dev() {
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
if (arg.includes('dev')) {
  dev()
} else if (arg.includes('build')) {
  await build()
}
