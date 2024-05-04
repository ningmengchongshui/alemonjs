import typescript from '@rollup/plugin-typescript'
import multiEntry from '@rollup/plugin-multi-entry'
const plugins = [typescript(), multiEntry()]
const onwarn = (warning, warn) => {
  if (warning.code === 'UNRESOLVED_IMPORT') return
  warn(warning)
}
const config = [
  {
    input: 'src/main.{ts,js,tsx,jsx}',
    file: 'dist/main.js'
  },
  {
    input: 'index.ts',
    file: 'dist/index.js'
  }
]
export default config.map(item => ({
  input: item.input,
  output: {
    file: item.file,
    format: 'esm',
    sourcemap: false
  },
  plugins: plugins,
  onwarn: onwarn
}))
