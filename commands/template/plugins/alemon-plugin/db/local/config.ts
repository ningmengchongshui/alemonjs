import { readFileSync } from 'fs'
import yaml from 'yaml'
import { MyDirPath } from '../../app.config.js'
/* 配置地址 */
const PathConfig = `${MyDirPath}/resources/defset`
/* 得到指定配置的数据 */
export const getJson = (name: string) =>
  JSON.parse(readFileSync(`${PathConfig}/${name}.json`, 'utf8'))

export const getYaml = (name: string) =>
  yaml.parse(readFileSync(`${PathConfig}/${name}.yaml`, 'utf8'))

export const getJsonPath = (name: string, path: string) =>
  JSON.parse(readFileSync(`${path}/${name}.json`, 'utf8'))

export const getYamlPath = (name: string, path: string) =>
  yaml.parse(readFileSync(`${path}/${name}.yaml`, 'utf8'))
