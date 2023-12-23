#!/usr/bin/env node
import { spawn } from 'child_process'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
const argv = [...process.argv.splice(2)]
const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = dirname(currentFilePath)
const cwd = resolve(currentDirPath)
const app = join(cwd, '../lib/bin.js')
if (argv.includes('dev') || argv.includes('build')) {
  const argsWithoutFiles = argv.join(' ').replace(/(\S+\.js|\S+\.ts)/g, '')
  const childProcess = spawn(`npx ts-node ${app} ${argsWithoutFiles}`, {
    shell: true
  })
  childProcess.stdout.on('data', data => {
    process.stdout.write(data.toString())
  })
  childProcess.stderr.on('data', data => {
    process.stderr.write(data.toString())
  })
}
