const path = require('path')
const fs = require('fs')
const config = require('alemonjs/pm2.config.cjs')
const dir = path.join(process.cwd(), 'dist/index.js')
// 如果存在  yarn build  -- dist/index.js
if (fs.existsSync(dir)) {
  // 修正 地址
  config.apps = config.apps.map(item => {
    item.script = 'dist/index.js'
    return item
  })
}
console.log('config', config)
/**
 * @type {import("pm2/pm2.config.cjs")}
 */
module.exports = config
