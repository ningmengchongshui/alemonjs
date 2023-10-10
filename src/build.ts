import { join } from 'path'
import { readdirSync, mkdirSync, existsSync } from 'fs'
import { rollup, RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import multiEntry from '@rollup/plugin-multi-entry'
import { compilationOptions } from './types.js'
/**
 * 编译插件
 * @param cfg
 * @returns
 */
export async function compilationTools(cfg: compilationOptions) {
  const { aInput, aOutput } = cfg
  try {
    const config: RollupOptions = {
      input: [aInput],
      onwarn: (warning, warn) => {
        // 忽略与无法解析的导入相关的警告信息
        if (warning.code === 'UNRESOLVED_IMPORT') return
        // 继续使用默认的警告处理
        warn(warning)
      },
      output: [
        {
          // 输出文件路径和名称
          file: aOutput,
          format: 'module',
          // 是否生成 sourcemap 文件
          sourcemap: false
        }
      ],
      plugins: [
        typescript({
          // 禁用声明文件的生成
          declaration: false
        }),
        multiEntry({
          // 指定要匹配的文件路径模式
          include: [aOutput]
        })
      ]
    }
    // 使用 Rollup API 编译代码
    const bundle = await rollup(config)
    // 判断
    if (config.output[0] && aOutput) {
      // 写入
      await bundle.write(config.output[0])
      // 集成
      const apps = await import(`file://${join(process.cwd(), aOutput)}`).catch(
        err => {
          console.error(err)
          return {}
        }
      )
      return apps
    } else {
      return {}
    }
  } catch (error) {
    console.error(error)
    console.error('err:', aInput)
    return {}
  }
}

/**
 * 递归得到所有文件绝对路径
 * @param dirPath 指定目录下
 * @returns
 */
export function getAllJsAndTsFilesSync(dirPath: string) {
  const files: any[] = []
  const entries = readdirSync(dirPath, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name)
    if (entry.isDirectory()) {
      files.push(...getAllJsAndTsFilesSync(fullPath))
    } else if (entry.isFile() && /\.(js|ts)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

const pDir = join(process.cwd(), 'plugins')

/**
 * 集成工程
 * @param AppName 目录名
 * @param DirName 默认apps
 * @returns
 */
export const integration = async (AppName: string, DirName = 'apps') => {
  /**
   * 集成
   */
  const apps = {}
  /**
   * 判断 plugins是否存在
   */
  if (!existsSync(pDir)) return {}
  /**
   * 插件目录
   */
  const RootPath = join(pDir, AppName)
  /**
   * 应用目录
   */
  const filepath = join(RootPath, DirName)
  /**
   * 确保存在
   */
  mkdirSync(filepath, { recursive: true })
  /**
   * 重名控制器
   */
  let acount = 0
  try {
    const arr = getAllJsAndTsFilesSync(filepath)
    for await (const AppDir of arr) {
      /**
       * 文件对象:对象中有多个class
       */
      const dirObject = await import(`file://${AppDir}`).catch(err => {
        console.error(AppDir)
        console.error(err)
        return {}
      })
      for (const item in dirObject) {
        /**
         * 如果该导出是class
         */
        if (dirObject[item].prototype) {
          if (!Object.prototype.hasOwnProperty.call(apps, item)) {
            /**
             * 不重名
             */
            apps[item] = dirObject[item]
            continue
          }
          const T = true
          while (T) {
            const keyName = `${item}$${acount}`
            if (!Object.prototype.hasOwnProperty.call(apps, keyName)) {
              /**
               * 不重名
               */
              apps[keyName] = dirObject[item]
              /**
               * 重置为0
               */
              acount = 0
              break
            } else {
              /**
               * 加1
               */
              acount++
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
  return apps
}
