import { join } from 'path'
import { existsSync, mkdirSync, readFileSync } from 'fs'
import { APPCONFIG } from '../configs.js'
import { writeFile } from 'fs/promises'
import { NodeDataType } from './types.js'
export class Help {
  AppName: string
  constructor(AppName?: string) {
    this.AppName = AppName
  }
  /**
   * 得到json
   * @param AppName
   * @returns
   */
  get() {
    const c = APPCONFIG.get('regex')
    if (!this.AppName || c === false) return {}
    const dir = APPCONFIG.get('route')
    const basePath = join(process.cwd(), dir, `${this.AppName}.json`)
    return JSON.parse(readFileSync(basePath, 'utf8'))
  }
  /**
   * 创建json
   * @returns
   */
  create(arr: NodeDataType[]) {
    const c = APPCONFIG.get('regex')
    if (!this.AppName || c === false) return
    const dir = APPCONFIG.get('route')
    const basePath = join(process.cwd(), dir)
    if (!existsSync(basePath)) mkdirSync(basePath, { recursive: true })
    writeFile(
      join(basePath, `${this.AppName}.json`),
      JSON.stringify(arr, null, 2),
      'utf-8'
    )
  }
}
