import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import { getFileRouter } from './back.js'
import { readdirSync, unlinkSync } from 'fs'
import { config } from './config.js'
import { join } from 'path'
class Server {
  #app: typeof Koa.prototype = null
  #currentPort = 4399
  #size = 0
  // 是否已经启动
  #state = false
  /**
   * 查看状态
   * @returns
   */
  getState() {
    return this.#state
  }
  /**
   * 启动
   */
  connect() {
    this.#app = new Koa()
    // 允许跨域请求
    this.#app.use(cors())
    // 处理 POST 请求体中的 JSON 数据
    this.#app.use(bodyParser())
    // 推送路由
    const router = getFileRouter()
    // 路由
    this.#app.use(router.routes())
    this.#app.use(router.allowedMethods())
    // 启动端口
    this.#listen(config.get('port'))
  }
  /**
   * 寻找端口
   * @param err
   * @returns
   */
  #handlePortConflict(err: { code: string }) {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `port ${this.#currentPort} occupied, attempting to start a new port...`
      )
      this.#currentPort++
      this.#size++
      if (this.#size >= 5) {
        console.error('find port err')
        return
      }
      this.#listen(this.#currentPort)
    } else {
      console.error('An error occurred while starting the #application', err)
    }
  }
  // 监听
  #listen(port: number) {
    this.#currentPort = port
    this.#app
      .listen(port, async () => {
        config.set('port', port)
        // 只要启动成功
        this.#state = true

        console.info('server', `http://[::]:${port}`)

        // 自动删除
        const fileDir = config.get('fileDir')
        setInterval(() => {
          const files = readdirSync(join(process.cwd(), fileDir))
          for (const file of files) {
            unlinkSync(join(process.cwd(), fileDir, file))
          }
        }, 300000)
      })
      .on('error', this.#handlePortConflict)
  }
}
export const FServer = new Server()
