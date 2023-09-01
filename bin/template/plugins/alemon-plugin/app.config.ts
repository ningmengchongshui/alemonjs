import { dirname, basename } from 'path'
import { fileURLToPath } from 'url'
export const DirPath = dirname(fileURLToPath(import.meta.url)).replace(
  /\\/g,
  '/'
)
export const AppName = basename(DirPath)
