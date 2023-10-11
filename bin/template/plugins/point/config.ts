import { getAppPath } from 'alemon'
import { basename } from 'path'
// 插件地址
export const DirPath = getAppPath(import.meta.url)
// 插件名
export const AppName = basename(DirPath)
