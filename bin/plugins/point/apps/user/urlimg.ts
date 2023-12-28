import { APlugin, AMessage } from 'alemonjs'
export class TestUrl extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?原神黄历$/,
          fnc: 'getAlmanac',
          dsc: '/原神黄历',
          doc: '得到今日日历'
        },
        {
          reg: /^(#|\/)?个人头像$/,
          fnc: 'getAvatar',
          dsc: '/个人头像',
          doc: '来张头像'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getAlmanac(e: AMessage) {
    e.reply(e.segment.http('https://api.xingzhige.com/API/yshl/'))
    return 
  }

  /**
   * @param e 消息对象
   * @returns
   */
  async getAvatar(e: AMessage) {
    e.reply(e.segment.http(e.user_avatar))
    return 
  }
}
