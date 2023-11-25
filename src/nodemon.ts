import { Settings } from 'nodemon'
const args = [...process.argv]
export const Anodemon: Settings = {
  args: args.splice(2),
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
