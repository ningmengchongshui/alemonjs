import { createBot } from 'alemonjs'
import configs from './alemon.config.js'
import logins from './alemon.login.js'
// 创建bot
createBot(configs, logins)
// exit
process.on('SIGINT', () => {
  if (process.pid) process.exit()
})
