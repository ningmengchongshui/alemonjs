import { readFileSync } from 'fs'
import { DirPath } from '../../app.config.js'
/**
 * 得到指定配置的数据
 * @param name
 * @returns
 */
export const getJson = (name: string) =>
  JSON.parse(readFileSync(`${DirPath}/resources/defset/${name}.json`, 'utf8'))
