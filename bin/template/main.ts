import { createApp } from 'alemonjs'
import * as rule from './src/apps.js'
// import api from './src/router.js'
const app = createApp(import.meta.url)
// app.use(api)
app.use(rule).mount()
console.log('[APP] 本地测试 启动')
