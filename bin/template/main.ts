import { createApp } from 'alemonjs'
import * as test from './apps.js'
createApp(import.meta.url)
  .use(test)
  .mount()
console.log('[APP] 本地测试 启动')
