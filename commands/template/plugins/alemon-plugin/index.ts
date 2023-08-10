//ts
import { createApp } from 'alemon'
/* 非依赖引用 */
import { AppName } from './app.config.js'
/** 创建实例化对象 */
const app = createApp(AppName)
/** 重定义e消息 */
app.setMessage(e => {
  /**
   * e.msg 是重要字段,不能被赋值
   * 但可以重定义成其他属性
   */
  // 用户编号
  e.user_id = e.user_id || e.msg?.author?.id
  // 用户头像
  e.user_avatar = e.user_avatar || e.msg?.author?.avatar
  return e
})
/** 加载apps目录 */
await app
  .create('apps')
  .then(() => {
    console.log('《柠檬测试》启动')
    return
  })
  .catch(err => {
    console.log(err)
    return
  })
/** 挂载 */
app.mount()
