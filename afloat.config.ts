import { defineAfloat } from './src/index'
export default defineAfloat({
  build: {
    input: 'apps/**/*.ts',
    output: 'alemon.app.js'
  }
})
