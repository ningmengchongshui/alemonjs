import { createApp } from 'alemonjs'
import * as test from './apps.js'
// import api from './api.js'
const app = createApp(import.meta.url)
// app.use(api)
app.use(test).mount()
console.log('[APP] 本地测试 启动')
