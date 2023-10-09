import { plugin, AMessage, getUrlbuffer } from 'alemon'
export class TestUrl extends plugin {
  constructor() {
    super({
      dsc: '开发简单示例演示',
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
  async getAlmanac(e: AMessage): Promise<boolean> {
    /* 消息发送机制 */
    e.reply(await getUrlbuffer('https://api.xingzhige.com/API/yshl/')).catch(
      err => {
        console.log(err)
      }
    )
    return false
  }

  /**
   * @param e 消息对象
   * @returns
   */
  async getAvatar(e: AMessage): Promise<boolean> {
    /* 消息发送机制 */
    e.reply(await getUrlbuffer(e.user_avatar)).catch(err => {
      console.log(err)
    })
    return false
  }
}
