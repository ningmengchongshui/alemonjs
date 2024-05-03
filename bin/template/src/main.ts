import { createApp } from 'alemonjs'
import * as rules from './rules'
// import api from './api/router'
const app = createApp(import.meta.url)
// app.use(api)
app.use(rules).mount()
