import { createStr, screenshotByFile, screenshotByUrl } from 'alemon'
import { writeFileSync } from 'fs'
import art from 'art-template'
import { DirPath, AppName } from '../../app.config.js'
/**
 * 旧的art写法
 * @param directory 文件
 * @param data 数据
 * @returns
 */
export function oImages(directory: string, data: object) {
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
/**
 * 新框架图片发送
 * 默认发送 pages/index.vue
 * @param key
 * @param params
 * @returns
 */
export async function obtainingImages(key: string = '/', params: any = {}) {
  const img = await screenshotByUrl({
    url: `http://127.0.0.1:3000${key}`,
    params
  }).catch((err: any) => {
    console.error(err)
    return false
  })
  if (typeof img == 'boolean') {
    return '图片工具重启中...'
  }
  return img
}
