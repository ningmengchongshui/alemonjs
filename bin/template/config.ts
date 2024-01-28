import { importPath } from 'alemonjs'
// app.cwd() 替代  process.cwd()
export const app = importPath(import.meta.url)
