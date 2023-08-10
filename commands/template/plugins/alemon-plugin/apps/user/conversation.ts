import {
  plugin,
  Messagetype,
  conversationHandlers,
  setConversationState,
  deleteConversationState
} from 'alemon'
export class conversation extends plugin {
  constructor() {
    super({
      dsc: '对话机示范',
      rule: [
        {
          reg: /^\/你好呀$/,
          fnc: 'startConversation'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async startConversation(e: Messagetype): Promise<boolean> {
    /** 匹配指令后,会以普通函数处理状态执行该方法 */
    e.reply('好的,现在开始你的个人对话').catch(err => {
      console.log(err)
    })
    const state = {
      step: 0, //会话次数
      data: e.cmd_msg, //携带的数据
      fnc: () => {} //携带的方法
    }
    /** 设置状态 */
    await setConversationState(e.msg.author.id, state).catch(err => {
      console.log(err)
    })
    /** 设置对话机 */
    conversationHandlers.set(e.msg.author.id, async (e, state) => {
      /* 对话次数 */
      state.step += 1
      /* 反馈状态 */
      e.reply(`[${state.step}]${e.cmd_msg}`).catch(err => {
        console.log(err)
      })
      /* 判断对话 */
      if (state.step >= 3) {
        /* 关闭对话 */
        e.reply(`对话次数已达上限~对话关闭`).catch(err => {
          console.log(err)
        })
        await deleteConversationState(e.msg.author.id).catch(err => {
          console.log(err)
        })
        return
      }
      await setConversationState(e.msg.author.id, state).catch(err => {
        console.log(err)
      })
      return
    })
    return false
  }
}
