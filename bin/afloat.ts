#!/usr/bin/env node
/**
 * bin负责执行ts文件
 * 不再处理任何ndoe逻辑
 */
import { commandRun } from '../lib/run.js'
const argv = [...process.argv.splice(2)]
if (argv.includes('dev') || argv.includes('build')) {
  commandRun(argv, 'lib/bin.js')
}
// 如果是 start 也就是后台运行
