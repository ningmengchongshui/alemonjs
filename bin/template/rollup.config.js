import typescript from '@rollup/plugin-typescript'
import multiEntry from '@rollup/plugin-multi-entry'
// import terser from '@rollup/plugin-terser'
export default {
  input: 'src/main.{ts,js,tsx,jsx}',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    typescript(),
    multiEntry()
    // terser()
    // 压缩
  ],
  onwarn: (warning, warn) => {
    // 忽略与无法解析the导入相关the警告信息
    if (warning.code === 'UNRESOLVED_IMPORT') return
    // 继续使用默认the警告处理
    warn(warning)
  }
}
