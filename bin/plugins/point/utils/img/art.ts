import { createHtml, screenshotByFile } from 'alemonjs'
import { writeFileSync } from 'fs'
import art from 'art-template'
import { app } from "../../config.js";

/**
 * @param directory 文件
 * @param data 数据
 * @returns
 */
export function oImages(directory: string, data: any = {}) {
  const { template, AdressHtml } = createHtml(
    app.name,
    `${app.cwd()}${directory}`
  )
  writeFileSync(AdressHtml, art.render(template, data))
  return screenshotByFile(AdressHtml, {
    SOptions: { type: 'jpeg', quality: 90 },
    tab: 'body',
    timeout: 2000
  })
}