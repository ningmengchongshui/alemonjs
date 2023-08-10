import { dealTpl } from './puppeteer/puppeteer.js'
import { getConfig } from './defset/defset.js'
import { MyDirPath } from '../app.config.js'

/* 选择调试文件并重启 */
const tplFile = `${MyDirPath}/resources/html/help/help.html`

const data = getConfig('help')

/* 调试结束 */
export function getData() {
  return dealTpl({
    /** heml路径 */
    tplFile,
    /** css路径 */
    pluResPath: ``,
    /** 版本 */
    version: 'V2.0',
    /** 数据 */
    ...data,
    body: data
    // data,
  })
}
