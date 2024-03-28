import { APlugin, type AEvent } from 'alemonjs'
import { getHelpImage } from '../../image'
export class TestLocal extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?柠檬帮助$/,
          fnc: 'help'
        },
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
  async help(e: AEvent) {
    const img = await getHelpImage([
      {
        id: 1,
        group: '指令示范效果',
        list: [
          {
            id: 1,
            name: '/百度一下',
            doc: '二维码'
          },
          {
            id: 2,
            name: '/你好呀',
            doc: '上下文机制'
          },
          {
            id: 2,
            name: '/原神黄历',
            doc: '网络图片'
          }
        ]
      }
    ])
    if (typeof img != 'boolean') e.reply(img)
    return
  }

  /**
   * @param e 消息对象
   * @returns
   */
  async sculpture(e: AEvent) {
    const segment = e.segment
    const img = segment.img('public/img/help/icon.jpg')
    if (typeof img != 'boolean') e.reply(img)
    return
  }
}
