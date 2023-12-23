import { reSetLogs } from '../lib/log.js'
if (process.env.NODE_ENV != 'production') {
  reSetLogs(() => {
    return `[AlemonJS] [${new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })}]`
  })
}
