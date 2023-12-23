import { Anodemon } from './nodemon.js'
import { DotenvConfigOptions } from 'dotenv'
import { RollupOptions } from 'rollup'
import { Settings } from 'nodemon'
import { Arollup } from './rollup.js'

/**
 * 初始化配置
 * @param options
 * @returns
 */
export function defineAfloat(options: {
  directory?: string
  rollup?: RollupOptions
  dotenv?: DotenvConfigOptions
  nodemon?: Settings
}) {
  const nodemon = options.nodemon
  for (const item in nodemon) {
    Anodemon[item] = nodemon[item]
  }
  if (Anodemon.script) {
    if (Array.isArray(Anodemon.watch)) {
      Anodemon.watch.push(Anodemon.script)
    }
  }
  options.nodemon = Anodemon
  const rollupOptions = options.rollup
  for (const item in rollupOptions) {
    Arollup[item] = rollupOptions[item]
  }
  options.rollup = Arollup
  return options
}
