#!/usr/bin/env node
import { existsSync, mkdirSync } from 'fs'
import { cpSync, rmSync, copyFile } from 'fs'
import { execSync } from 'child_process'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'node:url'
const args = [...process.argv.slice(2)]

interface options {
  name: string
  force: boolean
  cancel: boolean
}

const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = dirname(currentFilePath)
const alemonCliPath = resolve(currentDirPath)

async function createAlemon({ name, force, cancel }: options) {
  // 名字不存在
  if (!name) process.exit()
  // 当前目录下
  const dirPath = `./${name}`
  // 存在
  if (existsSync(dirPath)) {
    // 没有强制覆盖
    if (!force) {
      console.error('Robot name already exists!')
      return
    }
    rmSync(dirPath, { recursive: true })
  }
  mkdirSync(dirPath, { recursive: true })
  // 换行
  console.info('\n')
  try {
    //  templatePath  --> dirPath
    const templatePath = join(alemonCliPath, 'template')
    console.info('Copying template...')
    cpSync(templatePath, dirPath, { recursive: true })

    //  txtPath  --> textPath
    const txtPath = join(alemonCliPath, 'text')
    copyFile(`${txtPath}/npmrc.log`, `${dirPath}/.npmrc`, err => {})
    copyFile(`${txtPath}/gitignore.log`, `${dirPath}/.gitignore`, err => {})

    //  pluginsPath  --> dirPath
    // const pluginsPath = join(alemonCliPath, 'plugins')
    // console.info('Copying plugins...')
    // cpSync(pluginsPath, `${dirPath}/plugins`, { recursive: true })

    // 切换目录
    process.chdir(dirPath)

    // 自动加载依赖
    if (!cancel) {
      // 加载基础
      console.info(`npm install`)
      execSync('npm install', { stdio: 'inherit' })
    }

    console.info(`------------------------------------`)
    console.info('[DOCS] https://alemonjs.com/ ')
    console.info(`------------------------------------`)
    console.info(`cd ${name}       #进入机器人目录`)

    // 提示加载依赖
    if (cancel) {
      console.info(`------------------------------------`)
      console.info(`rm -rf .npmrc  #国际环境需删除.npmc`)
      console.info(`npm install`)
    }

    console.info(`------------------------------------`)
    console.info(`npm run dev      #开发模式`)
    console.info(`npm run build    #打包应用`)
    console.info(`npm run image    #图片调试`)
  } catch (error) {
    console.info(`${name} ${error}`)
    return
  }
}
const data: options = {
  name: 'alemonb',
  force: false,
  cancel: false
}
const inputName = args.indexOf('@name')
if (inputName != -1) {
  const output = args[inputName + 1].replace(/[^\u4e00-\u9fa5a-zA-Z0-9_]/g, '')
  if (output.length >= 3) data.name = output
}
// 强制覆盖
if (args.includes('force') || args.includes('f')) {
  data.force = true
}
// 取消依赖加载
if (args.includes('cancel') || args.includes('c')) {
  data.cancel = true
}
createAlemon(data)
