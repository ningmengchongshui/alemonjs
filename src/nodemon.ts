import { Settings } from 'nodemon'
export const Anodemon: Settings = {
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
