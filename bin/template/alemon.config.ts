import { join } from 'path'
import { existsSync } from 'fs'
import { defineConfig } from 'alemonjs'
const dir = join(process.cwd(), 'dist/main.js')
const scripts =
  process.env.NODE_ENV != 'production' && !existsSync(dir)
    ? 'src/main.ts'
    : 'dist/main.js'
console.info('[APP] 测试 启动', scripts)
// 当使用生产环境时,配置dist/index.js
export default defineConfig({
  app: {
    // 主应用入口
    scripts
  }
})
