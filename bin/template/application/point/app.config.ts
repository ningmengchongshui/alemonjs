import { getAppPath } from 'alemonjs'
import { basename } from 'path'
export const DirPath = getAppPath(import.meta.url)
export const AppName = basename(DirPath)
export const config = {
  input: `application/${AppName}/apps/**/*.ts`,
  file: `application/${AppName}/apps.js`,
  external: [
    'path',
    'fs',
    'url',
    'alemonjs',
    'mysql2',
    'art-template',
    'sequelize'
  ]
}
