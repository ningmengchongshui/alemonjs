import { getVersion } from '../lib/pkg.js'
const version = getVersion('/node_modules/afloat/package.json')
console.log(`[afloat] V${version}`)
