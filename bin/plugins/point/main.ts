import { createApp } from 'alemonjs'
import * as word from './apps.js'
createApp(import.meta.url).use(word).mount()
console.log('[APP] 测试插件 启动')
