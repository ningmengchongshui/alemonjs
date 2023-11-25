import { join } from 'path'
import { rollup, RollupOptions } from 'rollup'
import { createRollupCoinfg } from './config.js'
/**
 * 编译并返回应用导出
 * @param Options
 * @returns
 */
export async function buildTools(
  Options: {
    input: string
    output: string
  } = {
    input: 'apps/**/*.ts',
    output: 'alemon.app.js'
  }
) {
  try {
    const config: RollupOptions = createRollupCoinfg(
      Options?.input,
      Options?.output
    )
    // 使用 Rollup API 编译代码
    const bundle = await rollup(config)
    // 判断
    if (config.output[0] && Options?.output) {
      // 写入
      await bundle.write(config.output[0])
      // 集成
      const apps = await import(
        `file://${join(process.cwd(), Options?.output)}`
      ).catch(err => {
        console.error(err)
        return {}
      })
      return apps
    }
    return {}
  } catch (error) {
    console.error(error)
    console.error('err:', Options?.input)
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
    input: string
    output: string
  } = {
    input: 'apps/**/*.ts',
    output: 'alemon.app.js'
  }
) {
  try {
    const config: RollupOptions = createRollupCoinfg(
      Options?.input,
      Options?.output
    )
    // 使用 Rollup API 编译代码
    const bundle = await rollup(config)
    // 判断
    if (config.output[0] && Options?.output) {
      // 写入
      await bundle.write(config.output[0])
      return
    }
    return
  } catch (error) {
    console.error(error)
    console.error('err:', Options?.input)
    return
  }
}
