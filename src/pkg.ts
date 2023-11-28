import { readFileSync } from 'fs'
import { join } from 'path'
export function getVersion(dir: string) {
  const data = JSON.parse(readFileSync(join(process.cwd(), dir), 'utf-8'))
  return data?.version
}
