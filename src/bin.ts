import { mkdirSync, copyFileSync, existsSync, writeFileSync, cpSync } from 'fs'
import nodemon, { type Settings } from 'nodemon'
import { join, dirname } from 'path'
import { rollup, RollupOptions } from 'rollup'
import { config, type DotenvConfigOptions } from 'dotenv'

const argv = [...process.argv].splice(2)
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

function cpFiles(publicPath: string, dist: string) {
  if (!existsSync(publicPath)) return
  cpSync(publicPath, dist, { recursive: true })
}

let Path = join(cwd, 'afloat.config.ts')

if (!existsSync(Path)) {
  Path = join(cwd, 'afloat.config.js')
}

const options = (await import('file://' + Path)).default as {
  directory?: string
  rollup?: RollupOptions
  dotenv?: DotenvConfigOptions
  nodemon?: Settings
}

if (options.dotenv) {
  config(options.dotenv)
} else {
  config()
}

if (argv.includes('dev') && options.nodemon) {
  // 配置 nodemon
  nodemon(options.nodemon)
  // 监听启动事件
  nodemon.on('start', () => {
    console.log('[Afloat] start')
  })
  // 监听文件更改事件
  nodemon.on('restart', async message => {
    console.log('[Afloat] restart')
    console.log(message)
  })
  // 监听退出事件
  nodemon.on('quit', () => {
    console.log('[Afloat] quit')
    process.exit()
  })
} else if (argv.includes('build') && options.rollup) {
  // 使用 Rollup API 编译代码
  const bundle = await rollup(options.rollup)
  // 判断
  if (options.rollup?.output && Array.isArray(options.rollup?.output)) {
    for (const item of options.rollup.output) {
      await bundle.write(item)
    }
  }
  // 如何把文件推送到
  const dist = options.directory ?? 'dist'
  // 复制文件夹
  cpFiles(join(cwd, '/public'), `./${dist}/public`)
  // 复制包配置
  cpFile('package.json', `./${dist}/package.json`)
}
