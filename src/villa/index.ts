import { callBackByVilla } from './alemon/conversation.js'
import { checkRobotByVilla } from './login.js'
import { createClient, hmacSha256 } from './sdk/index.js'
import { getBotConfigByKey } from '../config/index.js'
import { getIP } from '../core/index.js'
export async function createAlemonByVilla() {
  // 登录
  if (
    await checkRobotByVilla().catch(err => {
      console.error(err)
      return false
    })
  ) {
    // 读取配置
    const cfg = getBotConfigByKey('villa')

    if ((cfg.pub_key ?? '') != '') {
      cfg.secret = hmacSha256(cfg.secret, cfg.pub_key)
    }

    /**
     * 创建客户端
     */
    createClient(
      {
        bot_id: cfg.bot_id,
        bot_secret: cfg.secret,
        callback_port: cfg.port ?? 8080,
        callback_url: cfg.url ?? '/api/mys/callback'
      },
      callBackByVilla,
      async () => {
        console.info('[HELLO] 欢迎使用大别野')
      }
    )

    // 获取ip4
    const ip = await getIP()
    if (ip) {
      console.info(
        `[OPEN] ${cfg.http ?? 'http'}://${ip}:${cfg.port ?? 8080}${
          cfg.url ?? '/api/mys/callback'
        }`
      )
    } else {
      console.error('公网IP识别失败~暂无法支持运行')
      return
    }
    return true
  }
  return false
}
