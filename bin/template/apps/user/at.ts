import { APlugin, AMessage } from 'alemonjs'
export class TestAt extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?艾特一下$/,
          fnc: 'AtOne'
        }
      ]
    })
  }

  /**
   * @param e 消息对象
   * @returns
   */
  async AtOne(e: AMessage) {
    e.reply([e.segment.at(e.user_id), '艾特一下'])
    if (e.segment.atChannel && e.channel_id) {
      e.reply(e.segment.atChannel(e.channel_id))
    }
    if (e.segment.link) {
      e.reply(e.segment.link('阿柠檬', 'https://alemonjs.com'))
    }
    return
  }
}
