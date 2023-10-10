import { RollupOptions } from 'rollup'
export interface compilationOptions extends RollupOptions {
  aInput: string
  aOutput: string
}
