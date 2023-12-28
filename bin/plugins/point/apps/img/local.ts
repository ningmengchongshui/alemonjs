import { APlugin, AMessage, getPathBuffer } from 'alemonjs'
export class TestLocal extends APlugin {
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
  async sculpture(e: AMessage) {
    const img = getPathBuffer('public/img/help/icon.jpg')
    if (typeof img != 'boolean') e.reply(img)
    return 
  }
}
