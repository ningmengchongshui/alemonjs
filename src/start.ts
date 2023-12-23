import { mkdirSync, copyFileSync, existsSync, writeFileSync, cpSync } from 'fs'
import { join, dirname } from 'path'
import { config, type DotenvConfigOptions } from 'dotenv'

const argv = [...process.argv]
const cwd = process.cwd()

let Path = join(cwd, 'afloat.config.ts')

if (!existsSync(Path)) {
  Path = join(cwd, 'afloat.config.js')
}

const options = (await import('file://' + Path)).default as {
  dotenv?: DotenvConfigOptions
}

if (options.dotenv) {
  config(options.dotenv)
} else {
  config()
}

/**
 * 封装pm2
 */
