import rollupTypescript from '@rollup/plugin-typescript'
import rollupMultiEntry from '@rollup/plugin-multi-entry'
import rollupTerser from '@rollup/plugin-terser'
export const typescript = rollupTypescript
export const multiEntry = rollupMultiEntry
export const terser = rollupTerser
export { Options as RollupTerserOptions } from '@rollup/plugin-terser'
export { RollupMultiEntryOptions } from '@rollup/plugin-multi-entry'
export { RollupTypescriptOptions } from '@rollup/plugin-typescript'
