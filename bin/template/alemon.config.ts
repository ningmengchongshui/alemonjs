import 'afloat/utils/logs'
import { defineAlemonConfig, analysis } from 'alemonjs'
import { login } from './a.login.config.js'
import { mysql, redis } from './a.db.config.js'
export default defineAlemonConfig({
  login: analysis(login),
  app: {
    scripts: 'main.ts'
  },
  server: {
    state: process.argv.includes('ntqq')
  },
  redis,
  mysql,
})
