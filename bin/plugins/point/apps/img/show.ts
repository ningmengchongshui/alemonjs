import { APlugin, AMessage, getPluginHelp } from 'alemonjs'
import { oImages, app } from '../../api.js'
export class TestShow extends APlugin {
  constructor() {
    super({
      dsc: '发送图片',
      rule: [
        {
          reg: /^(#|\/)?柠檬帮助.*$/,
          fnc: 'getHelp',
          dsc: '/柠檬帮助',
          doc: '获取所有指令'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getHelp(e: AMessage) {
    const img = await oImages('/public/html/help/index.html', {
      data: [
        {
          group: '指令示范效果',
          list: getPluginHelp(app.name)
        }
      ],
      name: 'point',
      version: '1.0.0'
    })
    if (img) e.reply(img)
    return 
  }
}
