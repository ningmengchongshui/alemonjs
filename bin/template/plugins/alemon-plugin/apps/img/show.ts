import { plugin, AMessage, createQrcode } from 'alemon'
import { obtainingImages, getJson, getJsonPath } from '../../api.js'
export class show extends plugin {
  constructor() {
    super({
      dsc: '发送图片',
      rule: [
        {
          reg: /^\/柠檬帮助.*$/,
          fnc: 'getHelp'
        },
        {
          reg: /^\/百度一下$/,
          fnc: 'baidu'
        },
        {
          reg: /^\/柠檬图标$/,
          fnc: 'sculpture'
        }
      ]
    })
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async getHelp(e: AMessage): Promise<boolean> {
    const HelpData = getJson('help')
    const PData = getJsonPath('package', process.cwd().replace(/\\/g, '/'))
    const data = {
      body: HelpData,
      name: PData['name'],
      version: PData['dependencies']['alemon']
    }
    const img = await obtainingImages('help', 'help', data).catch(err => {
      console.log(err)
      return '未知错误'
    })
    if (img) {
      e.reply(img).catch(err => console.log(err))
    }
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async baidu(e: AMessage): Promise<boolean> {
    const img: false | Buffer = await createQrcode('https://www.baidu.com/').catch(err => {
      console.log(err)
      return false
    })
    if (img) {
      e.reply('百度一下,你就知道', img).catch(err => {
        console.log(err)
      })
    }
    return false
  }
  /**
   * @param e 消息对象
   * @returns
   */
  async sculpture(e: AMessage): Promise<boolean> {
    const img = e.segment.buffer('./plugins/alemon-plugin/resources/assets/img/help/icon.png')
    if (img) {
      e.reply(img).catch(err => {
        console.log(err)
      })
    }
    return false
  }
}
