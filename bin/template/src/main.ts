import { createApp, Messages, Events } from 'alemonjs'
import * as rules from './rules'
// create
const app = createApp(import.meta.url)
// for in
for (const key in rules) {
  app.use(rules[key])
}

// 函数式 message
const message = new Messages()
message.response(/^最近怎样/, async e => {
  e.reply('很好~')
})
app.use(message.ok)

// 函数式 event
const event = new Events()
event.response('MESSAGES', async e => {
  if (e.typing == 'DELETE') console.info('触发撤回消息')
})
event.response('MEMBERS', async e => {
  if (e.typing == 'CREATE') console.info(e.user_id, '成员加入')
})
app.on(event.ok)

// init
app.mount()
