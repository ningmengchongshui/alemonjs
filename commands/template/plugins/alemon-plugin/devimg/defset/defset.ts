import { readFileSync } from 'node:fs'
import { MyDirPath } from '../../app.config'
export function getConfig(name) {
  /* 读取配置 */
  return JSON.parse(readFileSync(`${MyDirPath}/resources/defset/${name}.json`, 'utf8'))
}
