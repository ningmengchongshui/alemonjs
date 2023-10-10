import { getAppPath } from 'alemon'
import { basename } from 'path'
// 插件地址
export const DirPath = getAppPath(import.meta.url)
// 插件名
export const AppName = basename(DirPath)
// 编译配置
export const config = {
    input: `plugins/${AppName}/apps/**/*.ts`,
    file: `plugins/${AppName}/apps.js`,
    external: ['sequelize','alemon', 'path', 'fs', 'url', 'art-template','mysql2']
  }