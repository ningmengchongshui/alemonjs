import { RollupOptions } from 'rollup'
import { typescript, multiEntry, terser } from './plugins.js'

// 入口
const AInput = 'main.{ts,js}'
// 出口
const Aoutput = 'dist/main.js'

export const Arollup = {
  input: [AInput],
  onwarn: (warning, warn) => {
    // 忽略与无法解析的导入相关的警告信息
    if (warning.code === 'UNRESOLVED_IMPORT') return
    // 继续使用默认的警告处理
    warn(warning)
  },
  output: [
    {
      // 输出文件路径和名称
      file: Aoutput,
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
      include: [Aoutput]
    }),
    terser()
  ]
} as RollupOptions
