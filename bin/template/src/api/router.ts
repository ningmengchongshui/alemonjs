import { ARouter } from 'alemonjs'
const api = new ARouter()
api.get('/api/open', async ctx => {
  ctx.body = 'hello world'
})
export default api
