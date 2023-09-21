import { spawn } from 'child_process'

const ars = process.argv.slice(2)

const command = spawn(`ts-node src/main.ts ${ars.join(' ')}`, { shell: true })

command.stdout.on('data', data => {
  process.stdout.write(data.toString())
})

command.stderr.on('data', data => {
  process.stderr.write(data.toString())
})
