import { APlugin, AMessage, getPluginHelp } from 'alemonjs'
import { obtainingImages } from '../../src/api.js'
import { app } from '../../config.js'
export class TestHelp extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?柠檬帮助$/,
          fnc: 'getHelp',
          dsc: '/柠檬帮助',
          doc: '所有指令'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getHelp(e: AMessage) {
    const list = getPluginHelp(app.name)

    const img = await obtainingImages('/public/pages/help.vue', [
      {
        group: '指令示范效果',
        list: list
      }
    ])
    if (img) e.reply(img)
    return
  }
}
