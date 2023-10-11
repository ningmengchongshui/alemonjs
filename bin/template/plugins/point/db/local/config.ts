import { readFileSync } from 'fs'
import { DirPath } from '../../config.js'
/**
 * 得到指定配置的数据
 * @param name
 * @returns
 */
export function getJson(name: string) {
  return JSON.parse(
    readFileSync(`${DirPath}/resources/defset/${name}.json`, 'utf8')
  )
}
