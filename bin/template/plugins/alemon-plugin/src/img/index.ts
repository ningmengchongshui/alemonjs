import { createStr, screenshotByFile } from 'alemon'
import { writeFileSync } from 'fs'
import art from 'art-template'
import { DirPath, AppName } from '../../app.config.js'
/**
 * @param directory 文件
 * @param data 数据
 * @returns
 */
export const obtainingImages = async (
  directory: string,
  data: object
): Promise<string | false | Buffer> => {
  // 解析字符串
  const { control, template, AdressHtml } = createStr({
    AppName,
    tplFile: `${DirPath}${directory}`,
    data
  })
  // 需要重新写入
  if (control) {
    writeFileSync(AdressHtml, art.render(template, data))
  }
  // 截图
  return screenshotByFile(AdressHtml, {
    SOptions: { type: 'jpeg', quality: 90 },
    tab: 'body',
    timeout: 2000
  })
}
