import React from 'react'
import { renderToString } from 'react-dom/server'
import { Puppeteer, importPath } from 'alemonjs'
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
const app = importPath(import.meta.url)
// component
import HelpComponent, { DataType } from './conponent/help'
// cwd
const cwd = app.cwd()
// dir
const dir = join(cwd, 'public/html')
mkdirSync(dir, { recursive: true })
// init
const p = new Puppeteer()
/**
 * 用户信息
 * @param data
 * @returns
 */
export function getHelpImage(data: DataType, name = 'help.html') {
  // 渲染 React 组件为 HTML 字符串
  const html = renderToString(<HelpComponent data={data} />)
  const address = join(dir, name)
  writeFileSync(address, `<!DOCTYPE html>${html}`)
  return p.toFile(address, {})
}
