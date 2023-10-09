import { getAppPath } from 'alemon'
import { basename } from 'path'
export const DirPath = getAppPath(import.meta.url)
export const AppName = basename(DirPath)
export const config = {
  input: `plugins/${AppName}/apps/**/*.ts`,
  file: `plugins/${AppName}/apps.js`,
  external: ['alemon', 'path', 'fs', 'url', 'mysql2', 'sequelize']
}
