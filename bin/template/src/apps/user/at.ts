import { APlugin, type AEvent } from 'alemonjs'
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
  async AtOne(e: AEvent) {
    const segment = e.segment
    e.reply([segment.at(e.user_id), '艾特一下'])
    if (segment.atChannel && e.channel_id) {
      e.reply(segment.atChannel(e.channel_id))
    }
    if (segment.link) {
      e.reply(segment.link('阿柠檬', 'https://alemonjs.com'))
    }
    return
  }
}
