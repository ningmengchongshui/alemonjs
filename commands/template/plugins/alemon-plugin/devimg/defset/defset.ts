import { readFileSync } from 'node:fs'
import { DirPath } from '../../app.config'
export function getConfig(name) {
  /* 读取配置 */
  return JSON.parse(readFileSync(`${DirPath}/resources/defset/${name}.json`, 'utf8'))
}
