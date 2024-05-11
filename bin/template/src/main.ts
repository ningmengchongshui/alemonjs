import { createApp } from 'alemonjs'
import * as rules from './rules'
const app = createApp(import.meta.url)
for (const key in rules) {
  app.use(rules[key])
}
app.mount()
