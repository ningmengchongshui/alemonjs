import { spawn } from 'child_process'

/**
 * 这里要如何传递？
 */

const command = spawn('npm run app', { shell: true })

command.stdout.on('data', data => {
  process.stdout.write(data.toString())
})

command.stderr.on('data', data => {
  process.stderr.write(data.toString())
})
