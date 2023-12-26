import { Anodemon } from './nodemon.js'
import { DotenvConfigOptions } from 'dotenv'
import { RollupOptions } from 'rollup'
import { Settings } from 'nodemon'
import { Arollup } from './rollup.js'
import {
  RollupMultiEntryOptions,
  RollupTerserOptions,
  RollupTypescriptOptions
} from './plugins.js'
import { typescript, multiEntry, terser } from './plugins.js'

/**
 * 初始化配置
 * @param options
 * @returns
 */
export function defineAfloat(options: {
  directory?: string
  build?: {
    typescript?: RollupTypescriptOptions
    terser?: RollupTerserOptions
    multiEntry?: RollupMultiEntryOptions
  }
  rollup?: RollupOptions
  dotenv?: DotenvConfigOptions
  nodemon?: Settings
}) {
  /**
   * nodemon
   */
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

  /***
   * build 加载
   */
  if (options?.build) {
    Arollup.plugins = [
      typescript(
        options.build?.typescript ?? {
          // 禁用声明文件的生成
          declaration: false
        }
      ),
      multiEntry(
        options.build?.multiEntry ?? {
          // 指定要匹配的文件路径模式
          include: ['dist/main.js']
        }
      ),
      terser(options.build?.terser ?? {})
    ]
  }
  /**
   * rollup
   * ps: 若有plugins 会覆盖
   */
  for (const item in rollupOptions) {
    Arollup[item] = rollupOptions[item]
  }
  options.rollup = Arollup
  return options
}
