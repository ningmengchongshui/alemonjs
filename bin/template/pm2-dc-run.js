import { spawn } from 'child_process'

const command = spawn('npm run app:dc', { shell: true })

command.stdout.on('data', data => {
  process.stdout.write(data.toString())
})

command.stderr.on('data', data => {
  process.stderr.write(data.toString())
})
