import { APlugin, AEvent, AInstruct } from 'alemonjs'
import { obtainingImages } from '../../src/api.js'
import { app } from '../../config.js'
export class TestHelp extends APlugin {
  constructor() {
    super({
      rule: [
        {
          reg: /^(#|\/)?柠檬帮助$/,
          fnc: 'getHelp'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getHelp(e: AEvent) {
    const data = new AInstruct(app.name).get()
    console.log('data', data)
    const img = await obtainingImages('/public/pages/help.vue', [
      {
        group: '指令示范效果',
        list: data
      }
    ])
    if (img) e.reply(img)
    return
  }
}
