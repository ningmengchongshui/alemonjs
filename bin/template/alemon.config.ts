import { defineConfig } from 'alemonjs'
const NODE_ENV = process.env.NODE_ENV
const scripts = NODE_ENV == 'production' ? 'dist/index.js' : 'src/main.ts'
console.info('[APP] 本地测试 启动', NODE_ENV, scripts)
// 当使用生产环境时,配置dist/index.js
export default defineConfig({
  app: {
    // 主应用入口
    scripts
  }
})
