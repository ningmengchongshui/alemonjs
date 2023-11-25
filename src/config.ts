import { RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import multiEntry from '@rollup/plugin-multi-entry'
/**
 * 创建编译配置
 * @param aInput
 * @param aOutput
 * @returns
 */
export function createRollupCoinfg(aInput: string, aOutput: string) {
  return {
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
  } as RollupOptions
}
