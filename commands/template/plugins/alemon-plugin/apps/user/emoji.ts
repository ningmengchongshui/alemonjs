import { plugin, Messagetype } from 'alemon'
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
  async onrecall(e: Messagetype): Promise<boolean> {
    e.postEmoji({
      message_id: e.msg.id,
      emoji_type: 1,
      emoji_id: '4'
    }).catch(err => {
      console.log(err)
    })
    return false
  }
}
