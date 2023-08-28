import { readFileSync } from 'fs'
import { DirPath } from '../../app.config.js'
/* 配置地址 */
const PathConfig = `${DirPath}/resources/defset`
/* 得到指定配置的数据 */
export const getJson = (name: string) =>
  JSON.parse(readFileSync(`${PathConfig}/${name}.json`, 'utf8'))

export const getJsonPath = (name: string, path: string) =>
  JSON.parse(readFileSync(`${path}/${name}.json`, 'utf8'))
