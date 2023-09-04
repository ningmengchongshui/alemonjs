import { plugin, AMessage } from 'alemon'
export class TestEmonij extends plugin {
  constructor() {
    super({
      dsc: '表态示范',
      rule: [
        {
          reg: /^(#|\/)你得意什么$/,
          fnc: 'onrecall',
          dsc: '/你得意什么',
          doc: '发个表态'
        },
        {
          reg: /^(#|\/)艾特一下$/,
          fnc: 'AtOne',
          dsc: '/艾特一下',
          doc: '响应所有艾特'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async onrecall(e: AMessage): Promise<boolean> {
    if (e.replyEmoji) {
      e.replyEmoji(e.msg_id, {
        emoji_type: 1,
        emoji_id: '4'
      }).catch(err => {
        console.log(err)
      })
    }
    return false
  }

  /**
   * @param e 消息对象
   * @returns
   */
  async AtOne(e: AMessage): Promise<boolean> {
    e.reply([e.segment.at(e.user_id), ' ', e.segment.atAll(), ' '])
    if (e.segment.atChannel && e.channel_id) {
      e.reply(e.segment.atChannel(e.channel_id))
    }
    return false
  }
}
