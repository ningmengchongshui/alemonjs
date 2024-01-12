import { APlugin, AEvent } from 'alemonjs'
export class TestLocal extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?柠檬图标$/,
          fnc: 'sculpture'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async sculpture(e: AEvent) {
    const img = e.segment.img('public/img/help/icon.jpg')
    if (typeof img != 'boolean') e.reply(img)
    return
  }
}
