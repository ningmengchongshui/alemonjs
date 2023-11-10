import { join } from 'path'
import { rollup, RollupOptions } from 'rollup'
import { createRollupCoinfg } from './config.js'

/**
 * 编译并返回应用导出
 * @param Options
 * @returns
 */
export async function compilationTools(
  Options: {
    aInput: string
    aOutput: string
  } = {
    aInput: 'apps/**/*.ts',
    aOutput: 'alemon.app.js'
  }
) {
  try {
    const config: RollupOptions = createRollupCoinfg(
      Options?.aInput,
      Options?.aOutput
    )
    // 使用 Rollup API 编译代码
    const bundle = await rollup(config)
    // 判断
    if (config.output[0] && Options?.aOutput) {
      // 写入
      await bundle.write(config.output[0])
      // 集成
      const apps = await import(
        `file://${join(process.cwd(), Options?.aOutput)}`
      ).catch(err => {
        console.error(err)
        return {}
      })
      return apps
    }
    return {}
  } catch (error) {
    console.error(error)
    console.error('err:', Options?.aInput)
    return {}
  }
}

/**
 * 编译并返回应用导出
 * @param AppName
 * @param dir
 * @param url
 * @param name
 * @returns
 */
export async function buildTools(
  AppName: string,
  dir: string,
  url = 'apps',
  name = 'alemon.app.js'
) {
  const aInput = `${dir.replace(/^\//, '')}/${AppName}/${url}/**/*.ts`
  const aOutput = `${dir.replace(/^\//, '')}/${AppName}/${name}`
  try {
    const config: RollupOptions = createRollupCoinfg(aInput, aOutput)
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
    }
    return {}
  } catch (error) {
    console.error(error)
    console.error('err:', aInput)
    return {}
  }
}

/**
 * 编译应用
 * @param Options
 * @returns
 */
export async function buildModulsApps(
  Options: {
    aInput: string
    aOutput: string
  } = {
    aInput: 'apps/**/*.ts',
    aOutput: 'alemon.app.js'
  }
) {
  try {
    const config: RollupOptions = createRollupCoinfg(
      Options?.aInput,
      Options?.aOutput
    )
    // 使用 Rollup API 编译代码
    const bundle = await rollup(config)
    // 判断
    if (config.output[0] && Options?.aOutput) {
      // 写入
      await bundle.write(config.output[0])
      return
    }
    return
  } catch (error) {
    console.error(error)
    console.error('err:', Options?.aInput)
    return
  }
}
