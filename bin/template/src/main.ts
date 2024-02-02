import { createApp } from 'alemonjs'
import * as rules from './rules.js'
// import api from './api/router.js'
const app = createApp(import.meta.url)
// app.use(api)
app.use(rules).mount()
console.log('[APP] 本地测试 启动')
