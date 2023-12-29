import {
  APlugin,
  AMessage,
  Conversation,
} from 'alemonjs'
export class TestConversation extends APlugin {
  constructor() {
    super({
      dsc: '对话机示范',
      rule: [
        {
          reg: /^(#|\/)?你好呀$/,
          fnc: 'startCall',
          dsc: '/你好呀',
          doc: '对话机开始触发'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async startCall(e: AMessage) {
    e.reply('好的,现在开始你的个人对话')
    /** 
     * **********
     * 设置对话机
     * **********
     */

    // 添加回调
    Conversation.add(e.user_id, async (e: AMessage, state) => {
      /* 对话次数 */
      state.step += 1

      /* 判断对话 */
      if (state.step >= 3) {
        await Conversation.remove(e.user_id)
        setTimeout(() => {
          /* 关闭对话 */
          e.reply(`对话次数已达上限~对话关闭`)
        }, 1000)
        return
      }

      // 反馈状态
      e.reply(`[${state.step}]${e.msg}`)

      // 更新状态
      await Conversation.passing(e.user_id, state)
      return
    })
    
    
    // 设置状态
    await Conversation.passing(e.user_id, {
      step: 0, //会话次数
      data: e.msg, //携带的数据
      fnc: () => { } //携带的方法
    })
    return
  }
}
