import { readFileSync, existsSync } from 'fs'
import { exec } from 'child_process'
import { parse } from 'yaml'

/**
 * 执行指令
 * @param command
 * @returns
 */
export function exe(command: string) {
  return new Promise(resolve => {
    exec(command, (err, stdout) => {
      if (err) {
        console.info(err)
        process.exit()
      } else {
        resolve(stdout)
      }
    })
  })
}

/**
 * 读取配置
 * @param url
 * @returns
 */
export function getYaml(url: string) {
  if (existsSync(url)) return parse(readFileSync(url, 'utf8'))
  return false
}

export function getJson(url: string) {
  if (existsSync(url)) return JSON.parse(readFileSync(url, 'utf8'))
  return false
}