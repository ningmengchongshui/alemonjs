import { join } from 'path'
import { writeFileSync, existsSync } from 'fs'
import { fileTypeFromBuffer } from 'file-type'
import { config } from './config.js'
import { IP } from '../core/index.js'
import { createHash } from 'crypto'
import { FServer } from './client.js'

class CF {
  #size = 0
  /**
   * 得到本地文件请求地址
   * @param address
   * @returns
   */
  async getLocalFileUrl(address: string) {
    /**
     * 检查服务器是否启动
     */
    if (!FServer.getState() && this.#size <= 3) {
      this.#size++
      // 尝试启动
      FServer.connect()
    }
    // 检查文件是否存在
    let filePath: string
    if (existsSync(address)) {
      filePath = address
    } else {
      filePath = join(process.cwd(), address)
    }
    if (!existsSync(filePath)) return false
    const addressRouter = config.get('addressRouter')
    const base = await this.#getBaseUrl()
    const url = `${base}${addressRouter}?address=${address}`
    console.info('server url', url)
    return url
  }

  /**
   * 存储文件并得到请求地址
   * @param file
   * @param name
   * @returns
   */
  async getFileUrl(file: Buffer, name?: string) {
    if (!Buffer.isBuffer(file)) return false
    /**
     * 检查服务器是否启动
     */
    if (!FServer.getState() && this.#size <= 3) {
      this.#size++
      // 尝试启动
      FServer.connect()
    }
    const fileDir = config.get('fileDir')
    const fileRouter = config.get('fileRouter')
    // 使用 'bin' 作为默认扩展名
    const extension = (await fileTypeFromBuffer(file))?.ext ?? name ?? 'bin'
    const md5Hash = createHash('md5').update(file).digest('hex')
    const filename = `${md5Hash}.${extension}`
    const filePath = join(process.cwd(), fileDir, filename)
    if (!existsSync(filePath)) {
      // 保存文件到文件系统
      // 仅有该文件不存在的时候才写入
      console.info('server create', filePath)
      writeFileSync(filePath, file)
    }
    const base = await this.#getBaseUrl()
    const url = `${base}${fileRouter}/${filename}`
    console.info('setLocalFile url', url)
    return url
  }

  async #getBaseUrl() {
    const port = config.get('port')
    const http = config.get('http')
    const ip = await this.#getIp()
    return `${http}://${ip}:${port}`
  }

  async #getIp() {
    let ip = config.get('ip')
    if (ip == 'localhost') {
      const ipp = await IP.get()
      if (ipp) ip = ipp
    }
    return ip
  }
}
export const ClientFile = new CF()