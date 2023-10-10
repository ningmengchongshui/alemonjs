import { plugin, AMessage, getPathBuffer } from 'alemonjs'
export class TestLocal extends plugin {
  constructor() {
    super({
      dsc: '发送图片',
      rule: [
        {
          reg: /^(#|\/)?柠檬图标$/,
          fnc: 'sculpture',
          dsc: '/柠檬图标',
          doc: '看看机器人定制的本地图标'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async sculpture(e: AMessage): Promise<boolean> {
    const img = getPathBuffer('public/img/help/icon.jpg')
    if (img) {
      e.reply(img).catch(err => {
        console.log(err)
      })
    }
    return false
  }
}
