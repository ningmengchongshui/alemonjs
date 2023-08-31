import fs from 'fs'
import typescript from '@rollup/plugin-typescript'
import multiEntry from '@rollup/plugin-multi-entry'
// 读取插件目录下的所有目录
const pluginDirectories = fs
  .readdirSync('plugins', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
const rollup = []
// 为所有插件配置合成
for await (const item of pluginDirectories) {
  const input = `plugins/${item}/apps/**/*.ts`
  const file = `plugins/${item}/apps.js`
  rollup.push({
    input: [input],
    output: {
      // 输出文件路径和名称
      file: file,
      format: 'es',
      // 是否生成 sourcemap 文件
      sourcemap: false
    },
    plugins: [
      typescript({
        declaration: false // 禁用声明文件的生成
      }),
      multiEntry({
        include: [input] // 指定要匹配的文件路径模式
      })
    ]
  })
}
// 导出合成
export default rollup
