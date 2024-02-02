import { APlugin, type AEvent } from 'alemonjs'
import { obtainingImages } from '../../utils/image.js'
export class TestLocal extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?柠檬图标$/,
          fnc: 'sculpture'
        },
        {
          reg: /^(#|\/)?柠檬帮助$/,
          fnc: 'help'
        }
      ]
    })
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

  /**
   * @param e 消息对象
   * @returns
   */
  async help(e: AEvent) {
    const img = await obtainingImages('/public/pages/help.vue', [
      {
        group: '指令示范效果',
        list: [
          {
            name: '/百度一下',
            doc: '二维码'
          },
          {
            name: '/你好呀',
            doc: '上下文机制'
          },
          {
            name: '/原神黄历',
            doc: '网络图片'
          }
        ]
      }
    ])
    if (img) e.reply(img)
    return
  }
}
