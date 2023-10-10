import { plugin, AMessage } from 'alemon'
import { obtainingImages } from '../../api.js'
export class TestShow extends plugin {
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
  async getHelp(e: AMessage): Promise<boolean> {
    const img = await obtainingImages().catch(err => {
      console.log(err)
      return '未知错误'
    })
    if (img) {
      e.reply(img).catch(err => console.log(err))
    }
    return false
  }
}
