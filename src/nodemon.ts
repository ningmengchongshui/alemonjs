import { Settings } from 'nodemon'
export const Anodemon: Settings = {
  args: process.argv.splice(2),
  script: 'alemon.config.ts',
  verbose: true,
  delay: 1000,
  restartable: 'rs',
  execMap: {
    ts: 'ts-node'
  },
  ignore: ['node_modules'],
  watch: [],
  env: {
    NODE_ENV: 'development'
  },
  ext: 'js,ts'
}
