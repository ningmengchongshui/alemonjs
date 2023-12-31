import { APlugin, AMessage } from 'alemonjs'
export class TestLocal extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?柠檬图标$/,
          fnc: 'sculpture',
          dsc: '/柠檬图标',
          doc: '看看定制的图标'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async sculpture(e: AMessage) {
    const img = e.segment.img('public/img/help/icon.jpg')
    if (typeof img != 'boolean') e.reply(img)
    return
  }
}
