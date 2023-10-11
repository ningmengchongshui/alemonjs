import { createStr, screenshotByFile } from 'alemon'
import { writeFileSync } from 'fs'
import art from 'art-template'
import { DirPath, AppName } from '../../config.js'
/**
 * 旧的art写法
 * @param directory 文件
 * @param data 数据
 * @returns
 */
export function obtainingImages(directory: string, data: any = {}) {
  // 解析字符串
  const { control, template, AdressHtml } = createStr({
    AppName,
    tplFile: `${DirPath}${directory}`,
    data: data ?? {}
  })
  // 需要重新写入
  if (control) {
    writeFileSync(AdressHtml, art.render(template, data ?? {}))
  }
  // 截图
  return screenshotByFile(AdressHtml, {
    SOptions: { type: 'jpeg', quality: 90 },
    tab: 'body',
    timeout: 2000
  })
}
