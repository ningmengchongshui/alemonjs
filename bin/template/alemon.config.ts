import 'afloat/utils/logs'
import { defineAlemonConfig, analysis } from 'alemonjs'
import { login } from './a.login.config.js'
export default defineAlemonConfig({
  // 登录解析
  login: analysis(login),
  app: {
    // 主应用入口,
    scripts: 'main.ts'
  },
  server: {
    // 当启动ntqq平台时,启动静态文件挂载服务
    state: process.argv.includes('ntqq')
  },
  // 仅作配置传入,并不会主动连接redis
  redis: {
    password: '',
    port: 6379,
    host: '127.0.0.1',
    db: 1
  }
})
