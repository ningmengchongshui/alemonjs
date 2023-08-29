import { plugin, AMessage } from 'alemon'
export class emoji extends plugin {
  constructor() {
    super({
      dsc: '表态示范',
      rule: [
        {
          reg: /^\/你得意什么$/,
          fnc: 'onrecall'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async onrecall(e: AMessage): Promise<boolean> {
    e.replyEmoji(e.msg_id, {
      message_id: e.msg_id,
      emoji_type: 1,
      emoji_id: '4'
    }).catch(err => {
      console.log(err)
    })
    return false
  }
}
