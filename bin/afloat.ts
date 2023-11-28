#!/usr/bin/env node

import { mkdirSync, copyFileSync, existsSync, writeFileSync, cpSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { buildModulsApps, commandRun } from '../lib/index.js'
import { fileURLToPath } from 'url'

const argv = [...process.argv]
const arg = argv.splice(2)
const cwd = process.cwd()

function cpFile(tar: string, dist: string) {
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
  const put = output != false ? arg[output + 1] : `${dir}/main.js`
  await buildModulsApps({
    input: input != false ? arg[input + 1] : 'main.{ts,js}',
    output: put
  })
  // 指定
  cpFile('package.json', `${dir}/package.json`)
  const currentFilePath = fileURLToPath(import.meta.url)
  const currentDirPath = dirname(currentFilePath)
  const alemonCliPath = resolve(currentDirPath)
  // ./ 指的是当前下 ..指的是根目录下
  const publicPath = join(alemonCliPath, '../public')
  // 先指定，生成了目录文件夹，再循环
  cpSync(publicPath, `./${dir}/public`, { recursive: true })
}

if (arg.includes('dev')) {
  commandRun(arg, 'afloat.config.ts')
} else if (arg.includes('build')) {
  await build()
} else if (arg.includes('run')) {
  commandRun(arg)
}
