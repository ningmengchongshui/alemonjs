import { APlugin, AEvent } from 'alemonjs'
export class TestUrl extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?原神黄历$/,
          fnc: 'getAlmanac'
        },
        {
          reg: /^(#|\/)?个人头像$/,
          fnc: 'getAvatar'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getAlmanac(e: AEvent) {
    const segment = e.segment
    e.reply(segment.http('https://api.xingzhige.com/API/yshl/'))
    return
  }

  /**
   * @param e 消息对象
   * @returns
   */
  async getAvatar(e: AEvent) {
    const segment = e.segment
    e.reply(segment.http(e.user_avatar))
    return
  }
}
