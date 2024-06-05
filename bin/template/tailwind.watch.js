import { spawn } from 'child_process'
const tailwind = {
  '-i': './src/input.css',
  '-o': './public/css/output.css'
}
spawn(`npx tailwindcss -i ${tailwind['-i']} -o ${tailwind['-o']} --watch`, [], {
  shell: true,
  stdio: 'inherit'
})
