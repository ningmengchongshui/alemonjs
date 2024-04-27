import { APlugin, type AEvent } from 'alemonjs'
export class TestConversation extends APlugin {
  constructor() {
    super({
      // 对话机示范
      rule: [
        {
          reg: /^(#|\/)?你好呀$/,
          fnc: 'startCall'
        }
      ]
    })
  }

  state: {
    [key: string]: number
  } = {}

  /**
   * @param e 消息对象
   * @returns
   */
  async startCall(e: AEvent) {
    e.reply('好的,现在开始你的个人对话')
    /**
     * **********
     * 设置上下文
     * **********
     */
    this.subscribe('reBack')
    return
  }

  async reBack(e: AEvent) {
    if (/^^(#|\/)?关闭/.test(e.msg)) {
      e.reply(`验证结束`)
      // 关闭
      delete this.state[e.user_id]
      // 取消
      this.cancel()
      return
    }

    // init
    if (!this.state[e.user_id]) this.state[e.user_id] = 0
    // ++
    this.state[e.user_id] += 1

    // v
    if (this.state[e.user_id] > 3) {
      e.reply(`验证失败`)
      // 关闭
      delete this.state[e.user_id]
      // 取消
      this.cancel()
      return
    }

    e.reply(`[${this.state[e.user_id]}]请输入正确密码:${e.msg}`)
    return
  }
}
